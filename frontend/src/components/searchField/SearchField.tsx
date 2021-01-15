import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  components,
  OptionTypeBase,
  OptionProps,
  ValueType,
} from "react-select";
import Async from "react-select/async";
import { debounce } from "lodash";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";

import {
  SearchAll,
  SearchAll_searchScene as SceneAllResult,
  SearchAll_searchPerformer as PerformerAllResult,
} from "src/definitions/SearchAll";
import {
  SearchPerformers,
  SearchPerformers_searchPerformer as PerformerOnlyResult,
} from "src/definitions/SearchPerformers";
import { formatFuzzyDate } from "src/utils";

const SearchAllQuery = loader("src/queries/SearchAll.gql");
const SearchPerformersQuery = loader("src/queries/SearchPerformers.gql");

export enum SearchType {
  Performer = "performer",
  Combined = "combined",
}

interface SearchFieldProps {
  onClick?: (result: SceneResult | PerformerResult) => void;
  onClickPerformer?: (result: PerformerResult) => void;
  searchType: SearchType;
  excludeIDs?: string[];
  navigate?: boolean;
  placeholder?: string;
}

export type PerformerResult = PerformerAllResult | PerformerOnlyResult;
export type SceneResult = SceneAllResult;

interface SearchGroup {
  label: string;
  options: SearchResult[];
}
interface SearchResult extends OptionTypeBase {
  type: string;
  value: SceneResult | PerformerResult;
  label: string;
  subLabel: string;
}

const Option = (props: OptionProps<SearchResult>) => {
  const {
    data: { label, subLabel },
  } = props;
  return (
    <components.Option {...props}>
      <div className="search-value">{label}</div>
      <div className="search-subvalue">{subLabel}</div>
    </components.Option>
  );
};

const resultIsSearchAll = (
  arg: SearchAll | SearchPerformers
): arg is SearchAll =>
  (arg as SearchAll).searchPerformer !== undefined &&
  (arg as SearchAll).searchScene !== undefined;

function handleResult(
  result: SearchAll | SearchPerformers,
  callback: (result: SearchGroup[]) => void,
  excludeIDs: string[]
) {
  let performers: SearchResult[] = [];
  let scenes: SearchResult[] = [];

  if (resultIsSearchAll(result)) {
    const performerResults = (result?.searchPerformer?.filter(
      (p) => p !== null
    ) ?? []) as PerformerAllResult[];
    performers = performerResults
      .filter((performer) => !excludeIDs.includes(performer.id))
      .map((performer) => ({
        type: "performer",
        value: performer,
        label: `${performer.name}${
          // eslint-disable-next-line prefer-template
          performer.disambiguation ? " (" + performer.disambiguation + ")" : ""
        }`,
        subLabel: [
          performer?.birthdate
            ? `Born: ${formatFuzzyDate(performer.birthdate)}`
            : null,
          performer?.aliases.length
            ? `AKA: ${performer.aliases.join(", ")}`
            : null,
        ]
          .filter((p) => p !== null)
          .join(", "),
      }));

    const sceneResults = (result?.searchScene?.filter((p) => p !== null) ??
      []) as SceneAllResult[];
    scenes = sceneResults
      .filter((scene) => !excludeIDs.includes(scene.id))
      .map((scene) => ({
        type: "scene",
        value: scene,
        label: `${scene.title} ${scene.date ? `(${scene.date})` : ""}`,
        subLabel: `${scene?.studio?.name ?? ""}${
          scene.performers && scene.studio ? " • " : ""
        }
          ${scene.performers.map((p) => p.as || p.performer.name).join(", ")}`,
      }));
  } else {
    const performerResults = (result?.searchPerformer?.filter(
      (p) => p !== null
    ) ?? []) as PerformerOnlyResult[];
    performers = performerResults
      .filter((performer) => !excludeIDs.includes(performer.id))
      .map((performer) => ({
        type: "performer",
        value: performer,
        // eslint-disable-next-line prefer-template
        label: `${performer.name} ${
          performer.disambiguation ? "(" + performer.disambiguation + ")" : ""
        }`,
        subLabel: [
          performer.birthdate
            ? `Born: ${formatFuzzyDate(performer.birthdate)}`
            : null,
          performer.aliases.length
            ? `AKA: ${performer.aliases.join(", ")}`
            : null,
        ]
          .filter((p) => p !== null)
          .join(", "),
      }));
  }

  const options = [];
  if (performers.length)
    options.push({ label: "Performers", options: performers });
  if (scenes.length) options.push({ label: "Scenes", options: scenes });
  callback(options);
}

const SearchField: React.FC<SearchFieldProps> = ({
  onClick,
  onClickPerformer,
  searchType = SearchType.Performer,
  excludeIDs = [],
  navigate = false,
  placeholder,
}) => {
  const history = useHistory();
  const [selectedValue, setSelected] = useState(null);
  const [searchCallback, setCallback] = useState<
    (result: SearchGroup[]) => void
  >();
  const [search] = useLazyQuery(
    searchType === SearchType.Performer
      ? SearchPerformersQuery
      : SearchAllQuery,
    {
      fetchPolicy: "network-only",
      onCompleted: (result) => {
        if (searchCallback) handleResult(result, searchCallback, excludeIDs);
      },
    }
  );

  const handleSearch = (
    term: string,
    callback: (options: Array<SearchGroup>) => void
  ) => {
    if (term) {
      setCallback(() => callback);
      search({ variables: { term } });
    } else callback([]);
  };

  const debouncedLoadOptions = debounce(handleSearch, 400);

  const handleChange = (result: ValueType<SearchResult>) => {
    if (result) {
      const res = result as SearchResult;
      if (res.value.__typename === "Performer") onClickPerformer?.(res.value);
      onClick?.(res.value);
      if (navigate) history.push(`/${res.type}s/${res.value.id}`);
    }

    setSelected(null);
  };

  return (
    <div className="SearchField">
      <Async
        classNamePrefix="react-select"
        autoload={false}
        value={selectedValue}
        defaultOptions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadOptions={debouncedLoadOptions as any}
        onChange={handleChange}
        placeholder={
          placeholder ??
          (searchType === SearchType.Performer
            ? "Search for performer..."
            : "Search for performer or scene...")
        }
        components={{
          Option,
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        noOptionsMessage={({ inputValue }) =>
          inputValue === "" ? null : `No result found for "${inputValue}"`
        }
      />
    </div>
  );
};

export default SearchField;
