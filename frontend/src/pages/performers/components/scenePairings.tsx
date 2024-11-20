import { FC } from "react";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { debounce } from "lodash-es";
import Select from "react-select";
import {
  faSortAmountUp,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";

import {
  useScenePairings,
  GenderFilterEnum,
  PerformerSortEnum,
  SortDirectionEnum,
} from "src/graphql";
import { Icon } from "src/components/fragments";
import PerformerCard from "src/components/performerCard";
import SceneCard from "src/components/sceneCard";
import { GenderFilterTypes } from "src/constants";
import { usePagination, useQueryParams } from "src/hooks";
import { ensureEnum, resolveEnum } from "src/utils";
import { List } from "src/components/list";

const PER_PAGE = 25;

const genderOptions = Object.entries(GenderFilterEnum).map(([, value]) => ({
  value,
  label: GenderFilterTypes[value],
}));
const sortOptions = [
  { value: PerformerSortEnum.NAME, label: "Name" },
  { value: PerformerSortEnum.BIRTHDATE, label: "Birthdate" },
  { value: PerformerSortEnum.SCENE_COUNT, label: "Scene Count" },
  { value: PerformerSortEnum.CAREER_START_YEAR, label: "Career Start" },
  { value: PerformerSortEnum.DEBUT, label: "Scene Debut" },
  { value: PerformerSortEnum.CREATED_AT, label: "Created At" },
];

interface Props {
  id: string;
}

export const ScenePairings: FC<Props> = ({ id }) => {
  const [params, setParams] = useQueryParams({
    query: { name: "query", type: "string", default: "" },
    gender: { name: "gender", type: "string" },
    direction: { name: "dir", type: "string", default: SortDirectionEnum.ASC },
    sort: { name: "sort", type: "string", default: PerformerSortEnum.NAME },
    favorite: { name: "favorite", type: "string", default: "false" },
    scenes: { name: "scenes", type: "string", default: "false" },
  });
  const gender = resolveEnum(GenderFilterEnum, params.gender);
  const direction = ensureEnum(SortDirectionEnum, params.direction);
  const sort = ensureEnum(PerformerSortEnum, params.sort);
  const favorite = params.favorite === "true" || undefined;
  const fetchScenes = params.scenes === "true";
  const { page, setPage } = usePagination();

  const { data, loading } = useScenePairings({
    performerId: id,
    names: params.query,
    gender,
    favorite,
    page,
    per_page: PER_PAGE,
    sort,
    direction,
    fetchScenes,
  });

  const performers = data?.queryPerformers.performers;

  const debouncedHandler = debounce(setParams, 200);

  const filters = (
    <>
      <Form.Control
        id="performer-name"
        onChange={(e) => debouncedHandler("query", e.currentTarget.value)}
        placeholder="Filter performer name"
        defaultValue={params.query}
        className="w-auto"
      />
      <Select
        id="performer-gender"
        options={genderOptions}
        defaultValue={genderOptions.find((o) => o.value === gender)}
        placeholder="Gender"
        isClearable
        onChange={(e) => setParams("gender", e?.value ?? undefined)}
        classNamePrefix="react-select"
        className="performer-filter ms-2"
      />
      <InputGroup className="performer-sort ms-2 me-3">
        <Form.Select
          onChange={(e) =>
            setParams("sort", e.currentTarget.value.toLowerCase())
          }
          defaultValue={sort ?? "name"}
        >
          {sortOptions.map((s) => (
            <option value={s.value} key={s.value}>
              {s.label}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="secondary"
          onClick={() =>
            setParams(
              "direction",
              direction === SortDirectionEnum.ASC
                ? SortDirectionEnum.DESC
                : undefined,
            )
          }
        >
          <Icon
            icon={
              direction === SortDirectionEnum.DESC
                ? faSortAmountDown
                : faSortAmountUp
            }
          />
        </Button>
      </InputGroup>
      <Form.Group controlId="favorite">
        <Form.Check
          className="mt-2"
          type="switch"
          label="Favorites"
          defaultChecked={favorite}
          onChange={(e) =>
            setParams("favorite", e.currentTarget.checked.toString())
          }
        />
      </Form.Group>
      <Form.Group controlId="scenes">
        <Form.Check
          className="mt-2 ms-2"
          type="switch"
          label="Scenes"
          defaultChecked={fetchScenes}
          onChange={(e) =>
            setParams("scenes", e.currentTarget.checked.toString())
          }
        />
      </Form.Group>
    </>
  );

  return (
    <>
      <List
        entityName="Scene Pairings"
        page={page}
        filters={filters}
        setPage={setPage}
        perPage={PER_PAGE}
        loading={loading}
        listCount={data?.queryPerformers?.count}
      >
        {fetchScenes ? (
          performers?.map((p, i) => (
            <Row key={p.id}>
              <Col xs={3} key={p.id}>
                <PerformerCard performer={p} />
              </Col>
              <Col xs={9}>
                <Row>
                  {p?.scenes?.map((s) => (
                    <Col xs={4} key={s.id}>
                      <SceneCard scene={s} />
                    </Col>
                  ))}
                </Row>
              </Col>
              {i < performers.length - 1 && <hr />}
            </Row>
          ))
        ) : (
          <Row>
            {performers?.map((p) => (
              <Col xs={3} key={p.id}>
                <PerformerCard performer={p} />
              </Col>
            ))}
          </Row>
        )}
      </List>
    </>
  );
};
