import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

interface IParams<TModel extends Type<any>> {
  model?: TModel;
  status?: number;
}

export const ApiPaginatedResponse = ({ model }: IParams<any>) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              page: {
                type: 'number',
                example: 1,
              },
              pageSize: {
                type: 'number',
                example: 10,
              },
              totalPages: {
                type: 'number',
                example: 1,
              },
              count: {
                type: 'number',
                example: 1,
              },
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
