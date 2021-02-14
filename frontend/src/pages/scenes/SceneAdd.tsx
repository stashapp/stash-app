import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";

import { Scene_findScene as Scene } from "src/definitions/Scene";
import {
  AddSceneMutation as AddScene,
  AddSceneMutationVariables,
} from "src/definitions/AddSceneMutation";
import {
  SceneUpdateInput,
  SceneCreateInput,
} from "src/definitions/globalTypes";
import { sceneHref } from "src/utils";

import SceneForm from "./sceneForm";

const AddSceneMutation = loader("src/mutations/AddScene.gql");

const SceneAdd: React.FC = () => {
  const history = useHistory();
  const [insertScene] = useMutation<AddScene, AddSceneMutationVariables>(
    AddSceneMutation,
    {
      onCompleted: (data) => {
        if (data?.sceneCreate?.id) history.push(sceneHref(data.sceneCreate));
      },
    }
  );

  const doInsert = (updateData: SceneUpdateInput) => {
    const { id, ...sceneData } = updateData;
    const insertData: SceneCreateInput = {
      ...sceneData,
      fingerprints: updateData.fingerprints || [],
    };
    insertScene({ variables: { sceneData: insertData } });
  };

  const emptyScene = {
    id: "",
    date: null,
    title: null,
    details: null,
    urls: [],
    studio: null,
    tag_ids: null,
    director: null,
    images: [],
    tags: [],
    fingerprints: [],
    performers: [],
    __typename: "Scene",
  } as Scene;

  return (
    <div>
      <h2>Add new scene</h2>
      <hr />
      <SceneForm scene={emptyScene} callback={doInsert} />
    </div>
  );
};

export default SceneAdd;
