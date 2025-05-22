import { configApiRef, useApi } from '@backstage/core-plugin-api';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import stars from '../../data/stars.json';

export const StarBrowser = () => {
  const configApi = useApi(configApiRef);
  const isVisible = true || configApi.getOptional('task.vars.isVisible'); // for optional task: visibility should be determined by the config only

  if (!isVisible) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <ul aria-label="Stars">
          {stars.map(star => (
            <li key={star.id}>
              {star.name}
              <ul>
                {Object.entries(star).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
