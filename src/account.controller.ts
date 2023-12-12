// accounts.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AccountsService } from './account.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async getCoursesByAccountIds(@Query('accountIds') accountIds: string) {
    const parsedIds = accountIds.split(',').map((id) => +id);
    const courses =
      await this.accountsService.getCollectionsByAccountIds(parsedIds);
    return courses;
  }
}
