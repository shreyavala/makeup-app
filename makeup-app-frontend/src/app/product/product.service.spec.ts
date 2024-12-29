import { TestBed } from '@angular/core/testing'; //main testing api for angular

import { ProductService } from './product.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'; // for mocking http requests
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // import the testing module
      providers: [ProductService]
    }); 

    // create testing env
    service = TestBed.inject(ProductService); // inject the service
    httpMock = TestBed.inject(HttpTestingController); // inject the http mock
  })

  afterEach(() => {
    httpMock.verify();
  });

  // test 1: check if we have an instance of the service
  it('should be created', () => {
    expect(service).toBeTruthy(); // check if the service is created
  })

  // test 2: getProducts should be defined/ (products => means products list is returned)
  it('should get products', () => {

    // create dummy data
    const testProducts : Product[] =[
      {
        product_id: 'P503732',
        product_name: 'Skin Melt Talc-Free Loose Setting Powder',
        product_brand: 'Ami Colé',
        product_price: 22,
        product_ingredients: "['Synthetic Fluorphlogopite, Silica, Lauroyl Lysine, Caprylic/Capric Triglyceride, Squalane, Adansonia Digitata Fruit Extract, Hibiscus Sabdariffa Flower Extract, Sodium Hyaluronate, Glycerin, Pentylene Glycol, Glyceryl Caprylate, Hectorite, Dehydroacetic Acid, Glyceryl Undecylenate, Amethyst Powder, Quartz, Aqua (Water). May Contain (+/-) CI 77491 (Iron Oxides), CI 77499 (Iron Oxides), CI 77492 (Iron Oxides).']"
      }
    ]

    // test the getProduct method. Check if the products (test) match and are returned 
    service.getProducts().subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      expect(products).toEqual(testProducts);
    })

    // check if the request is made. 
    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush({ products: testProducts });
  }) 

  // test 3: getProductById should be defined
  it('should get product by id',() => {

    // create dummy data
    const testProduct : Product =
      {
        product_id: 'P503732',
        product_name: 'Skin Melt Talc-Free Loose Setting Powder',
        product_brand: 'Ami Colé',
        product_price: 22,
        product_ingredients: "['Synthetic Fluorphlogopite, Silica, Lauroyl Lysine, Caprylic/Capric Triglyceride, Squalane, Adansonia Digitata Fruit Extract, Hibiscus Sabdariffa Flower Extract, Sodium Hyaluronate, Glycerin, Pentylene Glycol, Glyceryl Caprylate, Hectorite, Dehydroacetic Acid, Glyceryl Undecylenate, Amethyst Powder, Quartz, Aqua (Water). May Contain (+/-) CI 77491 (Iron Oxides), CI 77499 (Iron Oxides), CI 77492 (Iron Oxides).']"
      }

    // test the getProductById method. Check if the product (test) match and is returned
    service.getProductById('P503732').subscribe(product => {
      expect(product.product_id).toEqual('P503732');
      expect(product).toEqual(testProduct);
    })

    const req = httpMock.expectOne(`${service['apiUrl']}/P503732`);
    expect(req.request.method).toBe('GET');
    req.flush({product: testProduct});
  })

});
