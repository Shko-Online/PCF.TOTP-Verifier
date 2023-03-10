/*
   Copyright 2023 Betim Beja and Shko Online LLC

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { ArgTypes } from '@storybook/react';
import { StoryArgs } from './StoryArgs';

import { getFromResource } from './getFromResource';

const secret_Name = getFromResource('Secret_Display_Key');
const secret_Description = getFromResource('Secret_Desc_Key');
// const dataset_Name = getFromResource('Verifier_DataSet_Display_Key');
const dataset_Description = getFromResource('Verifier_DataSet_Desc_Key');

export const argTypes: Partial<ArgTypes<StoryArgs>> = {
  Secret: {
    name: secret_Name,
    description: secret_Description,
    type: 'string',
  },
  datasetItems: {
    //name: dataset_Name,
    description: dataset_Description,
    control: 'object',
    table: {
      category: 'Dataset',
    },
  },
  lastSubmission: {
    control: false,
  },
};

