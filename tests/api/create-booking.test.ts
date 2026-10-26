import { expect, test } from '../../src/fixtures/test-fixtures';
import { BookingId, CreateBookingPayload } from '../../src/dto/booking-dto';

test.describe('Create Booking API', () => {
  test('Verify if the response returns 200 OK for the POST API endpoint for /booking with valid request payload', 
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

    const createBookingPayloadJSON = JSON.stringify(createBookingPayload);
    const createBookingResponse = await bookingsApi.createBooking(createBookingPayloadJSON);
    
    expect(createBookingResponse.status()).toBe(200);
    expect(createBookingResponse.headers()['content-type']).toContain('application/json');

    const booking = (await createBookingResponse.json());
    expect(booking).toEqual(
      expect.objectContaining({
        bookingid: expect.any(Number),
        booking: expect.objectContaining({
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
      }),
    );
  });

  test('Verify if the response returns 400 Bad Request for the POST API endpoint for /booking with an invalid request payload',
    async ({ bookingsApi, faker }) => {
  
      const invalidPayload = `{
        "firstname": "${faker.setRandomFirstName()}",
        "lastname": "${faker.setRandomLastName()}",
        "totalprice": "INVALID",
        "depositpaid": "idk",
        "bookingdates": {
          "checkin": "invalid",
          "checkout": "invalid"
        }
        "additionalneeds": "Merienda",

      }`;
  
      const response = await bookingsApi.createBooking(invalidPayload);
      expect(response.status()).toBe(400);
    }
  );

  test('Verify if the response returns 404 Not Found with an invalid POST API endpoint /bookingssss and with valid request payload', 
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

    const createBookingPayloadJSON = JSON.stringify(createBookingPayload);
    const createBookingResponse = await bookingsApi.createBooking(createBookingPayloadJSON, '/bookingssss');
    
    expect(createBookingResponse.status()).toBe(404);
  });

  test('Verify if the response returns 500 Not Found for the POST API endpoint for /booking with empty request payload', 
    async ({ bookingsApi }) => {
  
      const emptyPayload = `{}`;

      const response = await bookingsApi.createBooking(emptyPayload);
      expect(response.status()).toBe(500);
  });

});
