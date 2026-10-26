import { expect, test } from '../../src/fixtures/test-fixtures';
import { AuthPayload, CreateBookingPayload, UpdateBookingPayload } from '../../src/dto/booking-dto';
import { ENV } from 'src/config/env';

let authToken: string;

test.describe('Update Booking API', () => {
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

  test('Verify if the response returns 200 OK for the PUT API endpoint for /booking/$id with valid request payload', 
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

      const updateBookingPayload: UpdateBookingPayload = {
        firstname: faker.setRandomFirstName(),
        lastname: faker.setRandomLastName(),
        totalprice: faker.setRandomPrice(),
        depositpaid: false,
        bookingdates: {
          checkin: '2026-12-03',
          checkout: '2026-12-07',
        },
        additionalneeds: 'Lunch',
      };

      const updateBookingResponse = await bookingsApi.updateBooking(bookingId, updateBookingPayload, authToken);

      expect(updateBookingResponse.status()).toBe(200);

      const booking = await updateBookingResponse.json();

      expect(booking).toEqual(
        expect.objectContaining({
          firstname: expect.any(String),
          lastname: expect.any(String),
          totalprice: expect.any(Number),
          depositpaid: expect.any(Boolean),
          bookingdates: expect.objectContaining({
            checkin: expect.any(String),
            checkout: expect.any(String),
          }),
          additionalneeds: expect.any(String),
        })
      );

      expect(booking).toEqual(
        expect.objectContaining({
          firstname: updateBookingPayload.firstname,
          lastname: updateBookingPayload.lastname,
          totalprice: updateBookingPayload.totalprice,
          depositpaid: updateBookingPayload.depositpaid,
          bookingdates: {
            checkin: updateBookingPayload.bookingdates.checkin,
            checkout: updateBookingPayload.bookingdates.checkout,
          },
          additionalneeds: updateBookingPayload.additionalneeds,
        })
      );
  });

  test('Verify if the response returns 405 Method Not Allowed for the PUT API endpoint for /booking/$id with an invalid id', 
    async ({ bookingsApi, faker }) => {

      const updateBookingPayload: UpdateBookingPayload = {
        firstname: faker.setRandomFirstName(),
        lastname: faker.setRandomLastName(),
        totalprice: faker.setRandomPrice(),
        depositpaid: false,
        bookingdates: {
          checkin: '2026-12-03',
          checkout: '2026-12-07',
        },
        additionalneeds: 'Lunch',
      };

      const updateBookingResponse = await bookingsApi.updateBooking('91249078', updateBookingPayload, authToken);

      expect(updateBookingResponse.status()).toBe(405);
  });

  test('Verify if the response returns 400 Bad Request for the PUT API endpoint for /booking/$id with a missing JSON object in the request payload', 
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

      const missingJSONObjectPayload = `{
        "firstname": "${faker.setRandomFirstName()}",
        "lastname": "${faker.setRandomLastName()}",
        "totalprice": "INVALID",
        "depositpaid": "idk",
        "additionalneeds": "Merienda",
      }`;

      const updateBookingResponse = await bookingsApi.updateBooking(bookingId, missingJSONObjectPayload, authToken);

      expect(updateBookingResponse.status()).toBe(400);
  });

  test('Verify if the response returns 404 Not Found for the PUT API endpoint for /bookingStsts/$id with valid request payload', 
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

      const updateBookingPayload: UpdateBookingPayload = {
        firstname: faker.setRandomFirstName(),
        lastname: faker.setRandomLastName(),
        totalprice: faker.setRandomPrice(),
        depositpaid: false,
        bookingdates: {
          checkin: '2026-12-03',
          checkout: '2026-12-07',
        },
        additionalneeds: 'Lunch',
      };

      const updateBookingResponse = await bookingsApi.updateBooking(bookingId, updateBookingPayload, authToken, '/bookingStsts');

      expect(updateBookingResponse.status()).toBe(404);
  });
});
