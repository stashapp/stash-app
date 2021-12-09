import { FC, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { Button, Col, Form, Row, Tabs, Tab } from "react-bootstrap";
import Countries from "i18n-iso-countries";
import english from "i18n-iso-countries/langs/en.json";
import cx from "classnames";
import { sortBy, uniq, uniqBy } from "lodash-es";

import {
  GenderEnum,
  HairColorEnum,
  EyeColorEnum,
  BreastTypeEnum,
  EthnicityEnum,
  DateAccuracyEnum,
  PerformerEditDetailsInput,
} from "src/graphql";
import { getBraSize, parseBraSize, formatFuzzyDate } from "src/utils";
import { Performer_findPerformer as Performer } from "src/graphql/definitions/Performer";
import { Image } from "src/utils/transforms";

import { renderPerformerDetails } from "src/components/editCard/ModifyEdit";
import { Help } from "src/components/fragments";
import { BodyModification, EditNote } from "src/components/form";
import MultiSelect from "src/components/multiSelect";
import EditImages from "src/components/editImages";
import DiffPerformer from "./diff";
import { PerformerSchema, PerformerFormData } from "./schema";

Countries.registerLocale(english);
const CountryList = Countries.getNames("en");

type OptionEnum = {
  value: string;
  label: string;
};

const GENDER: OptionEnum[] = [
  { value: "null", label: "Unknown" },
  { value: "FEMALE", label: "Female" },
  { value: "MALE", label: "Male" },
  { value: "TRANSGENDER_FEMALE", label: "Transfemale" },
  { value: "TRANSGENDER_MALE", label: "Transmale" },
  { value: "INTERSEX", label: "Intersex" },
];

const HAIR: OptionEnum[] = [
  { value: "null", label: "Unknown" },
  { value: "BLONDE", label: "Blonde" },
  { value: "BRUNETTE", label: "Brunette" },
  { value: "BLACK", label: "Black" },
  { value: "RED", label: "Red" },
  { value: "AUBURN", label: "Auburn" },
  { value: "GREY", label: "Grey" },
  { value: "BALD", label: "Bald" },
  { value: "VARIOUS", label: "Various" },
  { value: "OTHER", label: "Other" },
];

const BREAST: OptionEnum[] = [
  { value: "null", label: "Unknown" },
  { value: "NATURAL", label: "Natural" },
  { value: "FAKE", label: "Augmented" },
  { value: "NA", label: "N/A" },
];

const EYE: OptionEnum[] = [
  { value: "null", label: "Unknown" },
  { value: "BLUE", label: "Blue" },
  { value: "BROWN", label: "Brown" },
  { value: "GREY", label: "Grey" },
  { value: "GREEN", label: "Green" },
  { value: "HAZEL", label: "Hazel" },
  { value: "RED", label: "Red" },
];

const ETHNICITY: OptionEnum[] = [
  { value: "null", label: "Unknown" },
  { value: "CAUCASIAN", label: "Caucasian" },
  { value: "BLACK", label: "Black" },
  { value: "ASIAN", label: "Asian" },
  { value: "INDIAN", label: "Indian" },
  { value: "LATIN", label: "Latino" },
  { value: "MIDDLE_EASTERN", label: "Middle Eastern" },
  { value: "MIXED", label: "Mixed" },
  { value: "OTHER", label: "Other" },
];

const UPDATE_ALIAS_MESSAGE = `When changing from alias A to B, it may be desirable to enable this so all unset performances will continue to have the old name.
If however a typo in the name is corrected, this should not be used.
`;

const getEnumValue = (enumArray: OptionEnum[], val: string) => {
  if (val === null) return enumArray[0].value;

  return val;
};

interface PerformerProps {
  performer: Performer;
  callback: (
    data: PerformerEditDetailsInput,
    note: string,
    updateAliases: boolean,
    id?: string
  ) => void;
  initialAliases?: string[];
  initialImages?: Image[];
  changeType: "modify" | "create" | "merge";
  saving: boolean;
}

const PerformerForm: FC<PerformerProps> = ({
  performer,
  callback,
  initialAliases = [],
  initialImages = [],
  saving,
}) => {
  const images = uniqBy([...performer.images, ...initialImages], (i) => i.id);
  const tattoos = (performer?.tattoos ?? []).map(
    ({ __typename, ...mod }) => mod
  );
  const piercings = (performer?.piercings ?? []).map(
    ({ __typename, ...mod }) => mod
  );
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PerformerFormData>({
    resolver: yupResolver(PerformerSchema),
    mode: "onBlur",
    defaultValues: {
      tattoos,
      piercings,
      images,
    },
  });

  const aliases = uniq([...performer.aliases, ...initialAliases]);
  const [activeTab, setActiveTab] = useState("personal");
  const [updateAliases, setUpdateAliases] = useState(false);
  const [file, setFile] = useState<File | undefined>();

  const fieldData = watch();
  const [oldChanges, newChanges] = useMemo(
    () => DiffPerformer(PerformerSchema.cast(fieldData), performer),
    [fieldData, performer]
  );
  const history = useHistory();

  const showBreastType =
    fieldData.gender !== GenderEnum.MALE &&
    fieldData.gender !== GenderEnum.TRANSGENDER_MALE;
  // Update breast type based on gender
  useEffect(() => {
    if (!showBreastType) setValue("boobJob", BreastTypeEnum.NA);
  }, [showBreastType, setValue]);

  const enumOptions = (enums: OptionEnum[]) =>
    enums.map((obj) => (
      <option key={obj.value} value={obj.value}>
        {obj.label}
      </option>
    ));

  const onSubmit = (data: PerformerFormData) => {
    const performerData: PerformerEditDetailsInput = {
      name: data.name,
      disambiguation: data.disambiguation,
      gender: GenderEnum[data.gender as keyof typeof GenderEnum] || null,
      eye_color:
        EyeColorEnum[data.eye_color as keyof typeof EyeColorEnum] || null,
      hair_color:
        HairColorEnum[data.hair_color as keyof typeof HairColorEnum] || null,
      career_start_year: data.career_start_year,
      career_end_year: data.career_end_year,
      height: data.height,
      ethnicity:
        EthnicityEnum[data.ethnicity as keyof typeof EthnicityEnum] || null,
      country: data.country,
      aliases: data.aliases.map((p: string) => p.trim()),
      piercings: data.piercings ?? [],
      tattoos: data.tattoos ?? [],
      breast_type:
        BreastTypeEnum[data.boobJob as keyof typeof BreastTypeEnum] || null,
      image_ids: data.images.map((i) => i.id),
    };

    performerData.measurements = {
      cup_size: null,
      band_size: null,
      waist: data.waistSize ?? null,
      hip: data.hipSize ?? null,
    };
    if (data.braSize != null) {
      const [cupSize, bandSize] = parseBraSize(data.braSize);
      performerData.measurements.cup_size = cupSize;
      performerData.measurements.band_size = bandSize ?? 0;
    }

    if (
      data.gender === GenderEnum.MALE ||
      data.gender === GenderEnum.TRANSGENDER_MALE
    )
      performerData.breast_type = BreastTypeEnum.NA;
    if (data.birthdate !== null)
      if (data.birthdate.length === 10)
        performerData.birthdate = {
          date: data.birthdate,
          accuracy: DateAccuracyEnum.DAY,
        };
      else if (data.birthdate.length === 7)
        performerData.birthdate = {
          date: `${data.birthdate}-01`,
          accuracy: DateAccuracyEnum.MONTH,
        };
      else
        performerData.birthdate = {
          date: `${data.birthdate}-01-01`,
          accuracy: DateAccuracyEnum.YEAR,
        };

    callback(performerData, data.note, updateAliases, data.id);
  };

  const countryObj = [
    { label: "Unknown", value: "" },
    ...sortBy(
      Object.keys(CountryList).map((name: string) => {
        const countryName: string = Array.isArray(CountryList[name])
          ? CountryList[name][0]
          : CountryList[name];
        return {
          label: countryName,
          value: Countries.getAlpha2Code(countryName, "en"),
        };
      }),
      "label"
    ),
  ];

  return (
    <Form className="PerformerForm" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" value={performer.id} {...register("id")} />
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => key && setActiveTab(key)}
        className="d-flex"
      >
        <Tab
          eventKey="personal"
          title="Personal Information"
          className="col-xl-9"
        >
          <Row>
            <Form.Group controlId="name" className="col-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className={cx({ "is-invalid": errors.name })}
                defaultValue={performer.name}
                {...register("name", { required: true })}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.name?.message}
              </Form.Control.Feedback>
              <Form.Text>The primary name used by the performer.</Form.Text>
            </Form.Group>
            <Form.Group controlId="disambiguation" className="col-6 mb-3">
              <Form.Label>Disambiguation</Form.Label>
              <Form.Control
                className={cx({ "is-invalid": errors.disambiguation })}
                defaultValue={performer.disambiguation ?? ""}
                {...register("disambiguation")}
              />
              <Form.Text>Required if the primary name is not unique.</Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors?.disambiguation?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {performer.id &&
            fieldData.name !== undefined &&
            performer.name !== fieldData.name && (
              <Row>
                <Form.Group className="col mb-3">
                  <Form.Check
                    id="update-modify-aliases"
                    checked={updateAliases}
                    onChange={() => setUpdateAliases(!updateAliases)}
                    label="Set unset performance aliases to old name"
                    className="d-inline-block"
                  />
                  <Help message={UPDATE_ALIAS_MESSAGE} />
                </Form.Group>
              </Row>
            )}

          <Row>
            <Form.Group controlId="aliases" className="col mb-3">
              <Form.Label>Aliases</Form.Label>
              <Controller
                control={control}
                name="aliases"
                defaultValue={aliases}
                render={({ field: { onChange } }) => (
                  <MultiSelect
                    values={aliases}
                    onChange={onChange}
                    placeholder="Enter name..."
                  />
                )}
              />
              <Form.Text>
                Any names used by the performer different from the primary name.
              </Form.Text>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="gender" className="col-6 mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                className={cx({ "is-invalid": errors.gender })}
                defaultValue={performer?.gender ?? ""}
                {...register("gender")}
              >
                {enumOptions(GENDER)}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors?.gender?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="birthdate" className="col-6 mb-3">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                className={cx({ "is-invalid": errors.birthdate })}
                placeholder="YYYY-MM-DD"
                defaultValue={
                  performer.birthdate
                    ? formatFuzzyDate(performer.birthdate)
                    : ""
                }
                {...register("birthdate")}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.birthdate?.message}
              </Form.Control.Feedback>
              <Form.Text>
                If the precise date is unknown the day and/or month can be
                omitted.
              </Form.Text>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="eye_color" className="col-6 mb-3">
              <Form.Label>Eye Color</Form.Label>
              <Form.Select
                className={cx({ "is-invalid": errors.eye_color })}
                defaultValue={
                  performer.eye_color
                    ? getEnumValue(EYE, performer.eye_color)
                    : ""
                }
                {...register("eye_color")}
              >
                {enumOptions(EYE)}
              </Form.Select>
              <Form.Control.Feedback>
                {errors?.eye_color?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="hair_color" className="col-6 mb-3">
              <Form.Label>Hair Color</Form.Label>
              <Form.Select
                className={cx({ "is-invalid": errors.hair_color })}
                defaultValue={
                  performer.hair_color
                    ? getEnumValue(HAIR, performer.hair_color)
                    : ""
                }
                {...register("hair_color")}
              >
                {enumOptions(HAIR)}
              </Form.Select>
              <Form.Control.Feedback>
                {errors?.hair_color?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="height" className="col-6 mb-3">
              <Form.Label>Height</Form.Label>
              <Form.Control
                className={cx({ "is-invalid": errors.height })}
                type="number"
                defaultValue={performer?.height || ""}
                {...register("height")}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.height?.message}
              </Form.Control.Feedback>
              <Form.Text>Height in centimeters</Form.Text>
            </Form.Group>

            {fieldData.gender !== "MALE" &&
              fieldData.gender !== "TRANSGENDER_MALE" && (
                <Form.Group controlId="boobJob" className="col-6 mb-3">
                  <Form.Label>Breast type</Form.Label>
                  <Form.Select
                    className={cx({ "is-invalid": errors.boobJob })}
                    defaultValue={
                      performer.breast_type
                        ? getEnumValue(BREAST, performer.breast_type)
                        : ""
                    }
                    {...register("boobJob")}
                  >
                    {enumOptions(BREAST)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.boobJob?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              )}
          </Row>

          {showBreastType && (
            <Row>
              <Form.Group controlId="braSize" className="col-4 mb-3">
                <Form.Label>Bra size</Form.Label>
                <Form.Control
                  className={cx({ "is-invalid": errors.braSize })}
                  defaultValue={getBraSize(performer.measurements)}
                  {...register("braSize", {
                    pattern: /\d{2,3}[a-zA-Z]{1,4}/i,
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.braSize?.message}
                </Form.Control.Feedback>
                <Form.Text>US Bra Size</Form.Text>
              </Form.Group>

              <Form.Group controlId="waistSize" className="col-4 mb-3">
                <Form.Label>Waist size</Form.Label>
                <Form.Control
                  className={cx({ "is-invalid": errors.waistSize })}
                  type="number"
                  defaultValue={performer.measurements.waist ?? ""}
                  {...register("waistSize")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.waistSize?.message}
                </Form.Control.Feedback>
                <Form.Text>Waist circumference in inches</Form.Text>
              </Form.Group>

              <Form.Group controlId="hipSize" className="col-4 mb-3">
                <Form.Label>Hip size</Form.Label>
                <Form.Control
                  className={cx({ "is-invalid": errors.hipSize })}
                  type="number"
                  defaultValue={performer.measurements.hip ?? ""}
                  {...register("hipSize")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.hipSize?.message}
                </Form.Control.Feedback>
                <Form.Text>Hip circumference in inches</Form.Text>
              </Form.Group>
            </Row>
          )}

          <Row>
            <Form.Group controlId="country" className="col-6 mb-3">
              <Form.Label>Nationality</Form.Label>
              <Controller
                control={control}
                name="country"
                defaultValue={performer.country}
                render={({ field: { onChange, value } }) => (
                  <Select
                    classNamePrefix="react-select"
                    onChange={(option) => onChange(option?.value)}
                    options={countryObj}
                    defaultValue={countryObj.find(
                      (country) => country.value === value
                    )}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.country?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="ethnicity" className="col-6 mb-3">
              <Form.Label>Ethnicity</Form.Label>
              <Form.Select
                className={cx({ "is-invalid": errors.ethnicity })}
                defaultValue={
                  performer.ethnicity
                    ? getEnumValue(ETHNICITY, performer.ethnicity)
                    : ""
                }
                {...register("ethnicity")}
              >
                {enumOptions(ETHNICITY)}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors?.ethnicity?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="career_start_year" className="col-6 mb-3">
              <Form.Label>Career Start</Form.Label>
              <Form.Control
                className={cx({ "is-invalid": errors.career_start_year })}
                type="year"
                placeholder="Year"
                defaultValue={performer?.career_start_year ?? ""}
                {...register("career_start_year")}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.career_start_year?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="career_end_year" className="col-6 mb-3">
              <Form.Label>Career End</Form.Label>
              <Form.Control
                className={cx({ "is-invalid": errors.career_end_year })}
                type="year"
                placeholder="Year"
                defaultValue={performer?.career_end_year ?? ""}
                {...register("career_end_year")}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.career_end_year?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div className="d-flex">
            <Button
              variant="danger"
              className="ms-auto me-2"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button className="me-1" onClick={() => setActiveTab("bodymod")}>
              Next
            </Button>
          </div>
        </Tab>

        <Tab
          eventKey="bodymod"
          title="Tattoos and Piercings"
          className="col-xl-9"
        >
          <BodyModification
            control={control}
            name="tattoos"
            locationPlaceholder="Add a tattoo for a location..."
            descriptionPlaceholder="Tattoo description..."
            formatLabel={(text) => `Add tattoo for location "${text}"`}
          />
          <Form.Control.Feedback
            className={cx({ "d-block": errors.tattoos })}
            type="invalid"
          >
            {errors?.tattoos?.map((mod, idx) => (
              <div key={idx}>
                Tattoo {idx + 1}: {mod?.location?.message}
              </div>
            ))}
          </Form.Control.Feedback>

          <BodyModification
            control={control}
            name="piercings"
            locationPlaceholder="Add a piercing for a location..."
            descriptionPlaceholder="Piercing description..."
            formatLabel={(text) => `Add piercing for location "${text}"`}
          />
          <Form.Control.Feedback
            className={cx({ "d-block": errors.piercings })}
            type="invalid"
          >
            {errors?.piercings?.map((mod, idx) => (
              <div key={idx}>
                Piercing {idx + 1}: {mod?.location?.message}
              </div>
            ))}
          </Form.Control.Feedback>

          <div className="d-flex mt-3">
            <Button
              variant="danger"
              className="ms-auto me-2"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button className="me-1" onClick={() => setActiveTab("images")}>
              Next
            </Button>
          </div>
        </Tab>

        <Tab eventKey="images" title="Images">
          <EditImages
            control={control}
            file={file}
            setFile={(f) => setFile(f)}
          />

          <div className="d-flex mt-1">
            <Button
              variant="danger"
              className="ms-auto me-2"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              className="me-1"
              disabled={!!file}
              onClick={() => setActiveTab("confirm")}
            >
              Next
            </Button>
          </div>
          <div className="d-flex">
            {/* dummy element for feedback */}
            <div className="ms-auto">
              <span className={file ? "is-invalid" : ""} />
              <Form.Control.Feedback type="invalid">
                Upload or remove image to continue.
              </Form.Control.Feedback>
            </div>
          </div>
        </Tab>

        <Tab eventKey="confirm" title="Confirm" className="mt-3 col-xl-9">
          {renderPerformerDetails(newChanges, oldChanges, true, updateAliases)}
          <Row className="my-4">
            <Col md={{ span: 8, offset: 4 }}>
              <EditNote register={register} error={errors.note} />
            </Col>
          </Row>
          <div className="d-flex mt-2">
            <Button
              variant="danger"
              className="ms-auto me-2"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled
              className="d-none"
              aria-hidden="true"
            />
            <Button type="submit" disabled={!!file || saving}>
              Submit Edit
            </Button>
          </div>
        </Tab>
      </Tabs>
    </Form>
  );
};

export default PerformerForm;
