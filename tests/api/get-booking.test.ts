import { expect, test } from '../../src/fixtures/test-fixtures';
import { BookingId } from '../../src/dto/booking-dto';

test.describe('Get Booking API', () => {
  test('Verify if the response returns 200 for the GET API endpoint for /booking', 
    async ({ bookingsApi }) => {
    const response = await bookingsApi.getBookingIds();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const bookings = (await response.json()) as BookingId[];
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings[0]).toEqual(
      expect.objectContaining({
        bookingid: expect.any(Number),
      }),
    );
  });

  test('Verify if the response returns 404 for the GET API endpoint for /bookingS', 
    async ({ bookingsApi }) => {
    const response = await bookingsApi.getBookingIds('bookingS');

    expect(response.status()).toBe(404);
  });

  test('Verify if the response returns 200 for the GET API endpoint for /booking/$id', 
    async ({ bookingsApi }) => {
    const response = await bookingsApi.getBookingById('1');

    expect(response.status()).toBe(200);

    const booking = (await response.json());
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
  });
});
