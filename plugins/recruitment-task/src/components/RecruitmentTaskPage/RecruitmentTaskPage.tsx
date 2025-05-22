import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
} from '@backstage/core-components';
import React from 'react';
import { StarBrowser } from '../StarBrowser';

export const RecruitmentTaskPage = () => (
  <Page themeId="tool">
    <Header title="Welcome to Recruitment Task!" />

    <Content>
      <ContentHeader title="Star browser" />
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Instructions">
            <Typography variant="body1">
              <p>
                Below is a list of stars. Your first task is to transform the
                data into a more user-friendly format by organizing it into a
                table instead of a list.
              </p>{' '}
              <p>
                Hint: You can utilize components from{' '}
                <Link href="https://mui.com/">MUI</Link> (Backstage uses version
                4, which is already installed, but feel free to use a newer
                version) or{' '}
                <Link href="https://backstage.io/storybook/">Backstage</Link>.
              </p>{' '}
              <p>
                Once the table is set up, enhance the display by adding filters
                (and potentially other interactive features) to give users
                greater control over the visible data.
              </p>
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <StarBrowser />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
