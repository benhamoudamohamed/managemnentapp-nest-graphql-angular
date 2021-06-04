import { Unit } from 'src/unit/entities/unit.entity';
import { ProductGroup } from 'src/product-group/entities/product-group.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { InvoiceType } from 'src/invoice/dto/invoice.input';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { ProductGroupType } from 'src/product-group/dto/productGroup.type';
import { UnitType } from 'src/unit/dto/unit.input';

@ObjectType('Product')
export class ProductType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  stockQuantity: number;

  @Field()
  minQuantity: number;

  @Field()
  buyingPriceHT: number;

  @Field()
  fodec: number;

  @Field()
  tva: number;

  @Field()
  sellingPriceNet: number;

  @Field()
  benificeMarge: number;

  @Field()
  benificeRate: number;

  @Field()
  sellingPriceTTC: number;

  @Field()
  created: Date; 

  @Field(type => ProductGroupType)
  productGroup: ProductGroup;
  
  @Field(type => UnitType)
  unit: Unit;
}
