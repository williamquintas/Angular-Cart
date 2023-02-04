import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AddressService } from "./address.service";

describe("AddressService", () => {
  let service: AddressService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AddressService],
    });
    service = TestBed.get(AddressService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should return address information for a valid zip code", () => {
    const zipCode = "22290-030";
    const mockAddress = {
      cep: zipCode,
      logradouro: "Avenida das Américas",
      bairro: "Barra da Tijuca",
      cidade: "Rio de Janeiro",
      estado: "RJ",
    };

    service.getAddressByZipCode(zipCode).subscribe((address) => {
      expect(address).toEqual(mockAddress);
    });

    const req = httpTestingController.expectOne(`/ws/${zipCode}/json`);
    expect(req.request.method).toEqual("GET");
    req.flush(mockAddress);
  });

  it("should return an error for an invalid zip code", () => {
    const zipCode = "000000";

    service.getAddressByZipCode(zipCode).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`/ws/${zipCode}/json`);
    expect(req.request.method).toEqual("GET");
    req.flush(null, { status: 404, statusText: "Not Found" });
  });
});
