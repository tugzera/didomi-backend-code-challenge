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
import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from '@users/application/commands';
import {
  GetUserDetailsQuery,
  GetUserListQuery,
} from '@users/application/queries';
import { User } from '@users/domain/entities/user';
import { AccountProvider } from '@users/infra/ioc/account-provider';
import { CreateUserDto, GetUserListDto } from '@users/presentation/dtos/inputs';
import { UpdateUserDto } from '@users/presentation/dtos/inputs/update-user.dto';
import {
  ResponseCreateUserDto,
  ResponseGetUserDetailsDto,
  ResponseGetUserListDto,
  ResponseUpdateUserDto,
} from '@users/presentation/dtos/outputs';

import {
  ApiPaginatedResponse,
  PaginationPropsDto,
  PaginationResponseProps,
  SortDirection,
} from '@repo/shared';

@ApiExtraModels(ResponseGetUserListDto, PaginationPropsDto)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(AccountProvider.COMMANDS.CREATE_USER)
    private createUser: CreateUserCommand.Contract,
    @Inject(AccountProvider.QUERIES.GET_USER_LIST)
    private getUserList: GetUserListQuery.Contract,
    @Inject(AccountProvider.QUERIES.GET_USER_DETAILS)
    private getUserDetails: GetUserDetailsQuery.Contract,
    @Inject(AccountProvider.COMMANDS.UPDATE_USER)
    private updateUser: UpdateUserCommand.Contract,
    @Inject(AccountProvider.COMMANDS.DELETE_USER)
    private deleteUser: DeleteUserCommand.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateUserDto })
  @Post()
  async handleCreateUser(
    @Body() dto: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    return this.createUser.execute(dto);
  }

  @ApiPaginatedResponse({ model: ResponseGetUserListDto })
  @Get()
  async handleGetUserList(
    @Query() dto: GetUserListDto,
  ): Promise<PaginationResponseProps<ResponseGetUserListDto>> {
    const response = await this.getUserList.execute({
      page: dto.page || 1,
      pageSize: dto.pageSize || 10,
      sortBy: dto.sortBy as keyof User,
      searchString: dto.searchString,
      sortDirection: dto.sortDirection as SortDirection,
    });
    return response;
  }

  @ApiOkResponse({ type: ResponseGetUserDetailsDto })
  @Get(':userId')
  async handleGetUserDetails(
    @Param('userId', ParseUUIDPipe)
    userId: string,
  ): Promise<ResponseGetUserDetailsDto> {
    const response = await this.getUserDetails.execute({
      userId,
    });
    return response;
  }

  @ApiOkResponse({ type: ResponseUpdateUserDto })
  @Patch(':userId')
  async handleUpdateUser(
    @Param('userId', ParseUUIDPipe)
    userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseUpdateUserDto> {
    return this.updateUser.execute({ ...dto, userId });
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
