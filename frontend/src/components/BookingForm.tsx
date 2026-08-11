import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    },
  });

  const handleClose = () => {
    setTermsAccepted(false);
    setTermsError(false);
    onClose();
  };

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
      if (!termsAccepted) {
        setTermsError(true);
        return;
      }

      const resolvedPackageId = packageId || "";
      const bookingData = {
        packageId: resolvedPackageId,
        travelDate,
        endDate,
        numberOfTravelers,
        travelers: travelers.slice(0, numberOfTravelers),
        paymentMethod,
        specialRequests,
        termsAccepted: true,
        termsAcceptedAt: new Date().toISOString(),
      };

      createBookingMutation.mutate(bookingData, {
        onSuccess: () => {
          setTermsAccepted(false);
          setTermsError(false);
          onSuccess?.();
          onClose();
        },
      });
    }
  };

  const totalPrice = packagePrice * numberOfTravelers;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-card text-card-foreground border border-border/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-elegant">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/40 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground font-display">Book {packageName}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Step {step === 'details' ? 1 : step === 'travelers' ? 2 : 3} of 3
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  <Users className="w-4 h-4 inline mr-2 text-accent" />
                  Number of Travelers
                </label>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleNumberOfTravelersChange(num)}
                      className={cn(
                        'px-4 py-2 rounded-lg border transition duration-200 cursor-pointer',
                        numberOfTravelers === num
                          ? 'bg-gradient-sunset text-white border-transparent shadow-glow'
                          : 'border-border text-foreground hover:border-primary bg-secondary/10'
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
                    className="flex-1 px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="or enter number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <Calendar className="w-4 h-4 inline mr-2 text-accent" />
                    Travel Date (Start)
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <Calendar className="w-4 h-4 inline mr-2 text-accent" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={travelDate}
                    className="w-full px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="bank_transfer" className="bg-card text-foreground">Bank Transfer</option>
                  <option value="credit_card" className="bg-card text-foreground">Credit Card</option>
                  <option value="debit_card" className="bg-card text-foreground">Debit Card</option>
                  <option value="cash" className="bg-card text-foreground">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Special Requests</label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  rows={3}
                  placeholder="Any special accommodations or requests?"
                />
              </div>
            </div>
          )}

          {step === 'travelers' && (
            <div className="space-y-6">
              {travelers.slice(0, numberOfTravelers).map((traveler, index) => (
                <div key={index} className="border border-border/60 rounded-xl p-4 space-y-4 bg-secondary/5">
                  <h3 className="font-semibold text-foreground">Traveler {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={traveler.firstName}
                      onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                      className="px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={traveler.lastName}
                      onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                      className="px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={traveler.email}
                      onChange={(e) => handleTravelerChange(index, 'email', e.target.value)}
                      className="px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={traveler.phone}
                      onChange={(e) => handleTravelerChange(index, 'phone', e.target.value)}
                      className="px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={traveler.country || ''}
                      onChange={(e) => handleTravelerChange(index, 'country', e.target.value)}
                      className="px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={traveler.dateOfBirth || ''}
                      onChange={(e) => handleTravelerChange(index, 'dateOfBirth', e.target.value)}
                      className="px-3 py-2 border border-border/80 rounded-lg bg-background text-foreground [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 'confirmation' && (
            <div className="space-y-6">
              <div className="bg-green-950/20 border border-green-900/50 rounded-xl p-4 flex gap-3 text-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-400 font-display">Ready to book!</h3>
                  <p className="text-sm text-green-300/90 mt-1">
                    Please review your details below and confirm your booking.
                  </p>
                </div>
              </div>

              <div className="bg-secondary/15 border border-border/40 rounded-xl p-6 space-y-4 text-foreground">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-muted-foreground text-sm">Package:</span>
                  <span className="font-semibold text-right">{packageName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-muted-foreground text-sm">Travelers:</span>
                  <span className="font-semibold">{numberOfTravelers}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-muted-foreground text-sm">Travel Dates:</span>
                  <span className="font-semibold">
                    {new Date(travelDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center text-lg">
                  <span className="font-bold">Total Price:</span>
                  <span className="font-bold text-accent">NPR {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Terms & Conditions Agreement */}
              <div className="pt-2 border-t border-border/40 space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="booking-terms-checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (e.target.checked) setTermsError(false);
                    }}
                    className="mt-1 h-4 w-4 rounded border-border/80 bg-background text-accent focus:ring-2 focus:ring-accent accent-accent cursor-pointer"
                  />
                  <label
                    htmlFor="booking-terms-checkbox"
                    className="text-sm text-foreground leading-snug cursor-pointer select-none"
                  >
                    I agree to the{' '}
                    <Link
                      to="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-2 hover:text-accent/80 font-medium transition"
                    >
                      Terms & Conditions
                    </Link>
                    .
                  </label>
                </div>
                {termsError && (
                  <p className="text-xs text-destructive flex items-center gap-1 font-medium pl-7">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Please agree to the Terms & Conditions to continue.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border/40 p-6 flex gap-3 justify-end z-10">
          <button
            onClick={() => {
              if (step === 'details') handleClose();
              else setStep(step === 'travelers' ? 'details' : 'travelers');
            }}
            className="px-6 py-2 border border-border/80 rounded-xl hover:bg-secondary/20 text-foreground transition duration-200 cursor-pointer"
          >
            {step === 'details' ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={createBookingMutation.isPending || (step === 'confirmation' && !termsAccepted)}
            className={cn(
              'px-6 py-2 rounded-xl text-white font-semibold transition duration-200',
              createBookingMutation.isPending || (step === 'confirmation' && !termsAccepted)
                ? 'bg-gray-700 opacity-60 cursor-not-allowed text-gray-400 shadow-none'
                : 'bg-gradient-sunset hover:opacity-95 cursor-pointer shadow-glow'
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
