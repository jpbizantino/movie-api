import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewEntity } from './entities/review.entity';
import { ReviewsService } from './reviews.service';
import { Roles } from 'src/roles/decorators/role.decorator';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { RolePermissionsGuard } from 'src/roles-permissions/guards/roles-permission.guard';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import { PermissionEnum } from 'src/permissions/enums/permission.enum';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly ReviewService: ReviewsService) {}

  @Post()
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.BASIC)
  // Permissions
  @Permissions(PermissionEnum.CREATE, PermissionEnum.CREATE_REVIEW)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReviewEntity })
  async create(@Body() createReviewDto: CreateReviewDto) {
    console.log(createReviewDto);
    return await this.ReviewService.create(createReviewDto);
  }

  @Get()
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.BASIC, RoleEnum.EDITOR)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReviewEntity, isArray: true })
  async findAll() {
    return await this.ReviewService.findAll();
  }

  @Get(':id')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Review Id' })
  @ApiOkResponse({ type: ReviewEntity })
  async findOne(@Param('id') id: string) {
    return await this.ReviewService.findOne(id);
  }

  @Patch(':id')
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR)
  // Permissions
  @Permissions(PermissionEnum.EDIT)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Review Id' })
  @ApiCreatedResponse({ type: ReviewEntity })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.ReviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR)
  // Permissions
  @Permissions(PermissionEnum.DELETE)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Review Id' })
  @ApiOkResponse({ type: ReviewEntity })
  async remove(@Param('id') id: string) {
    return await this.ReviewService.remove(id);
  }
}
