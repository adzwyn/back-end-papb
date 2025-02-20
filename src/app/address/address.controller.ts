import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AuthGuard } from '../auths/auth.guard';
import { createHttpException } from 'src/common/middlewares/utils/http-exception.util';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req: any,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    try {
      await this.addressService.create(createAddressDto, req);

      return {
        message: 'Successfully created address',
      };
    } catch (error) {
      createHttpException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findById(@Request() req: any) {
    try {
      const address = await this.addressService.findById(req);

      return {
        message: 'Address get successfully',
        data: address,
      };
    } catch (error) {
      createHttpException(error);
    }
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Request() req: any, @Param('id') id: number) {
    await this.addressService.update(id, req);

    return {
      message: 'Berhasil mengubah alamat pengiriman',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.addressService.remove(+id);

      return {
        message: 'Address delete successfully',
      };
    } catch (error) {
      createHttpException(error);
    }
  }
}
