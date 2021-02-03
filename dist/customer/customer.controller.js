"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getAllCustomer(res) {
        try {
            const customers = await this.customerService.getAllCustomer();
            return res.status(common_1.HttpStatus.OK).json(customers);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
    async getCustomer(res, customerID) {
        try {
            const customer = await this.customerService.getCustomer(customerID);
            if (!customer) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json('No customer found');
            }
            return res.status(common_1.HttpStatus.OK).json(customer);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
    async addCustomer(res, createCustomerDTO) {
        try {
            const customer = await this.customerService.addCustomer(createCustomerDTO);
            if (!customer) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json('Bad request');
            }
            return res.status(common_1.HttpStatus.CREATED).json({
                message: 'Customer has been created successfully',
                customer,
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
    async deleteCustomer(res, customerID) {
        try {
            const customer = await this.customerService.deleteCustomer(customerID);
            if (!customer) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json('No customer found');
            }
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Customer has been deleted',
                customer,
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
    async updateCustomer(res, customerID, createCustomerDTO) {
        try {
            const modifiedCustomer = await this.customerService.updateCustomer(customerID, createCustomerDTO);
            if (!modifiedCustomer) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json('No customer found');
            }
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Customer has been updated successfully',
                customer: modifiedCustomer,
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Retrieve all customers' }),
    swagger_1.ApiOkResponse({ description: 'Retrieved all customers successfully' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    common_1.Get('customers'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getAllCustomer", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Retrieve a customer by ID' }),
    swagger_1.ApiParam({ name: 'customerID', required: true, description: 'Unique identifier of customer' }),
    swagger_1.ApiOkResponse({ description: 'Retrieved customer successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No customer found' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    common_1.Get('customer/:customerID'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()), __param(1, common_1.Param('customerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomer", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Create a new customer' }),
    swagger_1.ApiCreatedResponse({ description: 'Created customer successfully' }),
    swagger_1.ApiBadRequestResponse({ description: 'Bad request' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    common_1.Post('customer'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_customer_dto_1.CreateCustomerDTO]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addCustomer", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Delete a customer by ID' }),
    swagger_1.ApiParam({ name: 'customerID', required: true, description: 'Unique identifier of customer' }),
    swagger_1.ApiOkResponse({ description: 'Customer has been deleted' }),
    swagger_1.ApiNotFoundResponse({ description: 'No customer found' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    common_1.Delete('customer/:customerID'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()), __param(1, common_1.Param('customerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Update a customer' }),
    swagger_1.ApiParam({ name: 'customerID', required: true, description: 'Unique identifier of customer' }),
    swagger_1.ApiOkResponse({ description: 'Customer has been successfully updated' }),
    swagger_1.ApiNotFoundResponse({ description: 'No customer found' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    common_1.Put('customer'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('customerID')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_customer_dto_1.CreateCustomerDTO]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
CustomerController = __decorate([
    swagger_1.ApiTags('customer'),
    common_1.Controller(''),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map