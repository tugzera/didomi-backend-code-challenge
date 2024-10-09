import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from '@account/application/commands';
import { GetUserListQuery } from '@account/application/queries';
import { User } from '@account/domain/entities/user';
import { AccountProvider } from '@account/infra/ioc/account-provider';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationResponseProps } from '@shared/domain/types';
import { ApiPaginatedResponse } from '@shared/presentation/decorators/paginated.decorator';
import {
  PaginationPropsDto,
  SortDirection,
} from '@shared/presentation/dtos/pagination-props.dto';
import { CreateUserDto, GetUserListDto } from '../dtos/inputs';
import { UpdateUserDto } from '../dtos/inputs/update-user.dto';
import {
  ResponseCreateUserDto,
  ResponseGetUserListDto,
  ResponseUpdateUserDto,
} from '../dtos/outputs';

@ApiExtraModels(ResponseGetUserListDto, PaginationPropsDto)
@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(AccountProvider.COMMANDS.CREATE_USER)
    private createUser: CreateUserCommand.Contract,
    @Inject(AccountProvider.QUERIES.GET_USER_LIST)
    private getUserList: GetUserListQuery.Contract,
    @Inject(AccountProvider.COMMANDS.UPDATE_USER)
    private updateUser: UpdateUserCommand.Contract,
    @Inject(AccountProvider.COMMANDS.DELETE_USER)
    private deleteUser: DeleteUserCommand.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateUserDto })
  @Post()
  async handleCreateUser(
    @Body() input: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    return this.createUser.execute(input);
  }

  @ApiPaginatedResponse({ model: ResponseGetUserListDto })
  @Get()
  async handleGetUserList(
    @Query() input: GetUserListDto,
  ): Promise<PaginationResponseProps<ResponseGetUserListDto>> {
    const response = await this.getUserList.execute({
      page: input.page || 1,
      pageSize: input.pageSize || 10,
      sortBy: input.sortBy as keyof User,
      searchString: input.searchString,
      sortDirection: input.sortDirection as SortDirection,
    });
    return response;
  }

  @ApiOkResponse({ type: ResponseUpdateUserDto })
  @Patch(':userId')
  async handleUpdateUser(
    @Param('userId', ParseUUIDPipe)
    userId: string,
    @Body() input: UpdateUserDto,
  ): Promise<ResponseUpdateUserDto> {
    return this.updateUser.execute({ ...input, userId });
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async handleDeleteUser(
    @Param('userId', ParseUUIDPipe)
    userId: string,
  ): Promise<void> {
    await this.deleteUser.execute({ userId });
  }
}
