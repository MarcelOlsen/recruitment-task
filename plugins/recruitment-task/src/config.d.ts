import { ConfigApi } from '@backstage/core-plugin-api';

/** @public */
export interface Config {
    task?: {

        vars?: {
            /**
             * @visibility frontend
             */
            isVisible?: boolean;
        };
    };
} 