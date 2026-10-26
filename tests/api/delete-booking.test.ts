import { expect, test } from '../../src/fixtures/test-fixtures';
import { AuthPayload, CreateBookingPayload, UpdateBookingPayload } from '../../src/dto/booking-dto';
import { ENV } from 'src/config/env';

let authToken: string;

test.describe('Delete Booking API', () => {
   test.beforeAll(async ({ bookingsApi }) => {
    const authPayload: AuthPayload = {
      username: ENV.API_USERNAME,
      password: ENV.API_PASSWORD
    }

    const authTokenResponse = await bookingsApi.authBooking(
      authPayload
    );

    const authTokenResponseJSON = await authTokenResponse.json();
    authToken = authTokenResponseJSON.token;
  });

  test('Verify if the response returns 201 Created for the DELETE API endpoint for /booking/$id', 
    async ({ bookingsApi, faker }) => {

      const createBookingPayload: CreateBookingPayload = {
        firstname: faker.setRandomFirstName(),
        lastname: faker.setRandomLastName(),
        totalprice: faker.setRandomPrice(),
        depositpaid: true,
        bookingdates: {
          checkin: '2026-12-02',
          checkout: '2026-12-06',
        },
        additionalneeds: 'Breakfast',
      };
      
      const createBookingResponse = await bookingsApi.createBooking(createBookingPayload);
      expect(createBookingResponse.status()).toBe(200);
      const createBookingResponseJSON = await createBookingResponse.json();
      const bookingId = createBookingResponseJSON.bookingid;
      console.log('Booking ID: ' + bookingId);

      const deleteBookingResponse = await bookingsApi.deleteBooking(bookingId, authToken);
      expect(deleteBookingResponse.status()).toBe(201);
  });

  test('Verify if the response returns 404 Not Found for the DELETE API endpoint for /booking/$id with an empty ID', 
    async ({ bookingsApi }) => {

      const emptyBookingId = '';

      const deleteBookingResponse = await bookingsApi.deleteBooking(emptyBookingId, authToken);
      expect(deleteBookingResponse.status()).toBe(404);

  });

  test('Verify if the response returns 404 Not Found for the DELETE API endpoint for /booking/$id for a Booking ID that is already deleted', 
    async ({ bookingsApi, faker }) => {

      const createBookingPayload: CreateBookingPayload = {
        firstname: faker.setRandomFirstName(),
        lastname: faker.setRandomLastName(),
        totalprice: faker.setRandomPrice(),
        depositpaid: true,
        bookingdates: {
          checkin: '2026-12-02',
          checkout: '2026-12-06',
        },
        additionalneeds: 'Breakfast',
      };
      
      const createBookingResponse = await bookingsApi.createBooking(createBookingPayload);
      expect(createBookingResponse.status()).toBe(200);
      const createBookingResponseJSON = await createBookingResponse.json();
      const bookingId = createBookingResponseJSON.bookingid;
      console.log('Booking ID: ' + bookingId);

      await bookingsApi.deleteBooking(bookingId, authToken);
      const getDeletedBookingResponse = await bookingsApi.getBookingById(bookingId);
      expect(getDeletedBookingResponse.status()).toBe(404);

  });

  test('Verify if the response returns 404 Not Found with an invalid DELETE API endpoint for /bookingInvalid/$id', 
    async ({ bookingsApi, faker }) => {

      const createBookingPayload: CreateBookingPayload = {
        firstname: faker.setRandomFirstName(),
        lastname: faker.setRandomLastName(),
        totalprice: faker.setRandomPrice(),
        depositpaid: true,
        bookingdates: {
          checkin: '2026-12-02',
          checkout: '2026-12-06',
        },
        additionalneeds: 'Breakfast',
      };
      
      const createBookingResponse = await bookingsApi.createBooking(createBookingPayload);
      expect(createBookingResponse.status()).toBe(200);
      const createBookingResponseJSON = await createBookingResponse.json();
      const bookingId = createBookingResponseJSON.bookingid;
      console.log('Booking ID: ' + bookingId);

      await bookingsApi.deleteBooking(bookingId, authToken);
      const getDeletedBookingResponse = await bookingsApi.getBookingById(bookingId, '/bookingInvalid');
      expect(getDeletedBookingResponse.status()).toBe(404);

  });
  
});
