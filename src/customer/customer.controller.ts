import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@ApiTags('customer')
@Controller('')
export class CustomerController {

  constructor(private customerService: CustomerService) {}

  @ApiOperation({summary: 'Retrieve all customers'})
  @ApiOkResponse({description: 'Retrieved all customers successfully'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @Get('customers')
  async getAllCustomer(@Res() res) {
    try {
      const customers = await this.customerService.getAllCustomer();
      return res.status(HttpStatus.OK).json(customers);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @ApiOperation({summary: 'Retrieve a customer by ID'})
  @ApiParam({name: 'customerID', required: true, description: 'Unique identifier of customer'})
  @ApiOkResponse({description: 'Retrieved customer successfully'})
  @ApiNotFoundResponse({ description: 'No customer found' })
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @Get('customer/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
    try {
      const customer = await this.customerService.getCustomer(customerID);
      if (!customer) {
        return res.status(HttpStatus.NOT_FOUND).json('No customer found');
      }
      return res.status(HttpStatus.OK).json(customer);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @ApiOperation({summary: 'Create a new customer'})
  @ApiCreatedResponse({description: 'Created customer successfully'})
  @ApiBadRequestResponse({ description: 'Bad request'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @Post('customer')
  async addCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
    try {
      const customer = await this.customerService.addCustomer(createCustomerDTO);
      if (!customer) {
        return res.status(HttpStatus.BAD_REQUEST).json('Bad request');
      }
      return res.status(HttpStatus.CREATED).json({
        message: 'Customer has been created successfully',
        customer,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @ApiOperation({summary: 'Delete a customer by ID'})
  @ApiParam({name: 'customerID', required: true, description: 'Unique identifier of customer'})
  @ApiOkResponse({description: 'Customer has been deleted'})
  @ApiNotFoundResponse({ description: 'No customer found' })
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @Delete('customer/:customerID')
  async deleteCustomer(@Res() res, @Param('customerID') customerID) {
    try {
      const customer = await this.customerService.deleteCustomer(customerID);
      if (!customer) {
        return res.status(HttpStatus.NOT_FOUND).json('No customer found');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been deleted',
        customer,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @ApiOperation({summary: 'Update a customer'})
  @ApiParam({name: 'customerID', required: true, description: 'Unique identifier of customer'})
  @ApiOkResponse({description: 'Customer has been successfully updated'})
  @ApiNotFoundResponse({ description: 'No customer found' })
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @Put('customer')
  async updateCustomer(
    @Res() res,
    @Query('customerID') customerID,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    try {
      const modifiedCustomer = await this.customerService.updateCustomer(customerID,createCustomerDTO,);
      if (!modifiedCustomer) {
        return res.status(HttpStatus.NOT_FOUND).json('No customer found');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been updated successfully',
        customer: modifiedCustomer,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  } 

}
