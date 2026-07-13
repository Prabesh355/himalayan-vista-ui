import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X, Calendar, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '@/services/api';
import { cn } from '@/lib/utils';

type Traveler = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  dateOfBirth?: string;
};

type BookingFormProps = {
  packageId: string;
  packageName: string;
  packagePrice: number;
  onClose: () => void;
  onSuccess?: () => void;
};

export function BookingForm({
  packageId,
  packageName,
  packagePrice,
  onClose,
  onSuccess,
}: BookingFormProps) {
  const [step, setStep] = useState<'details' | 'travelers' | 'confirmation'>('details');
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState<Traveler[]>([
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      dateOfBirth: '',
    },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [specialRequests, setSpecialRequests] = useState('');

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    },
  });

  const handleNumberOfTravelersChange = (num: number) => {
    setNumberOfTravelers(num);
    if (travelers.length < num) {
      // Add new traveler slots
      const newTravelers = [...travelers];
      for (let i = travelers.length; i < num; i++) {
        newTravelers.push({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          dateOfBirth: '',
        });
      }
      setTravelers(newTravelers);
    } else if (travelers.length > num) {
      // Remove extra travelers
      setTravelers(travelers.slice(0, num));
    }
  };

  const handleTravelerChange = (index: number, field: string, value: string) => {
    const newTravelers = [...travelers];
    newTravelers[index] = { ...newTravelers[index], [field]: value };
    setTravelers(newTravelers);
  };

  const handleSubmit = async () => {
    if (step === 'details') {
      if (!travelDate || !endDate) {
        alert('Please select travel dates');
        return;
      }
      setStep('travelers');
      return;
    }

    if (step === 'travelers') {
      // Validate traveler details
      const allFilled = travelers.slice(0, numberOfTravelers).every(
        (t) => t.firstName && t.lastName && t.email && t.phone
      );
      if (!allFilled) {
        alert('Please fill in all traveler details');
        return;
      }
      setStep('confirmation');
      return;
    }

    if (step === 'confirmation') {
      const resolvedPackageId = packageId || "";
      const bookingData = {
        packageId: resolvedPackageId,
        travelDate,
        endDate,
        numberOfTravelers,
        travelers: travelers.slice(0, numberOfTravelers),
        paymentMethod,
        specialRequests,
      };

      createBookingMutation.mutate(bookingData, {
        onSuccess: () => {
          onSuccess?.();
          onClose();
        },
      });
    }
  };

  const totalPrice = packagePrice * numberOfTravelers;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Book {packageName}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Step {step === 'details' ? 1 : step === 'travelers' ? 2 : 3} of 3
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Number of Travelers
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleNumberOfTravelersChange(num)}
                      className={cn(
                        'px-4 py-2 rounded border transition',
                        numberOfTravelers === num
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 hover:border-primary'
                      )}
                    >
                      {num}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={numberOfTravelers}
                    onChange={(e) =>
                      handleNumberOfTravelersChange(parseInt(e.target.value) || 1)
                    }
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="or enter number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Travel Date (Start)
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={travelDate}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Special Requests</label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                  placeholder="Any special accommodations or requests?"
                />
              </div>
            </div>
          )}

          {step === 'travelers' && (
            <div className="space-y-6">
              {travelers.slice(0, numberOfTravelers).map((traveler, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold">Traveler {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={traveler.firstName}
                      onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={traveler.lastName}
                      onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={traveler.email}
                      onChange={(e) => handleTravelerChange(index, 'email', e.target.value)}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={traveler.phone}
                      onChange={(e) => handleTravelerChange(index, 'phone', e.target.value)}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={traveler.country || ''}
                      onChange={(e) => handleTravelerChange(index, 'country', e.target.value)}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={traveler.dateOfBirth || ''}
                      onChange={(e) => handleTravelerChange(index, 'dateOfBirth', e.target.value)}
                      className="px-3 py-2 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 'confirmation' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900">Ready to book!</h3>
                  <p className="text-sm text-green-800">
                    Please review your details below and confirm your booking.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-semibold">{packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travelers:</span>
                  <span className="font-semibold">{numberOfTravelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travel Dates:</span>
                  <span className="font-semibold">
                    {new Date(travelDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total Price:</span>
                  <span className="font-bold text-primary">NPR {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t p-6 flex gap-3 justify-end">
          <button
            onClick={() => {
              if (step === 'details') onClose();
              else setStep(step === 'travelers' ? 'details' : 'travelers');
            }}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            {step === 'details' ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={createBookingMutation.isPending}
            className={cn(
              'px-6 py-2 rounded text-white font-semibold',
              createBookingMutation.isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            )}
          >
            {createBookingMutation.isPending
              ? 'Processing...'
              : step === 'confirmation'
                ? 'Confirm Booking'
                : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
