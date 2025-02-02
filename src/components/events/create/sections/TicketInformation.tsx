import React from 'react';
import { FormData } from '../CreateEventForm';

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<Record<keyof FormData, string>>;
};

export default function TicketInformation({ formData, setFormData, errors }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Ticket Information</h2>
      
      <div className="space-y-6">
        {/* Ticket Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Type <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="free"
                checked={formData.ticketType === 'free'}
                onChange={(e) => setFormData({ ...formData, ticketType: e.target.value as 'free' | 'paid' })}
                className="text-purple-600 focus:ring-purple-500"
                required
              />
              <span className="ml-2">Free</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="paid"
                checked={formData.ticketType === 'paid'}
                onChange={(e) => setFormData({ ...formData, ticketType: e.target.value as 'free' | 'paid' })}
                className="text-purple-600 focus:ring-purple-500"
                required
              />
              <span className="ml-2">Paid</span>
            </label>
          </div>
        </div>

        {/* Ticket Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.ticketName}
            onChange={(e) => setFormData({ ...formData, ticketName: e.target.value })}
            className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., General Admission"
            required
          />
          {errors.ticketName && (
            <p className="text-red-500 text-sm mt-1">{errors.ticketName}</p>
          )}
        </div>

        {/* Price and Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.ticketType === 'paid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.ticketPrice}
                onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.ticketPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.ticketPrice}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity Available <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.ticketQuantity}
              onChange={(e) => setFormData({ ...formData, ticketQuantity: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              required
            />
            {errors.ticketQuantity && (
              <p className="text-red-500 text-sm mt-1">{errors.ticketQuantity}</p>
            )}
          </div>
        </div>

        {/* Sales Period */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Sales Period <span className="text-red-500">*</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.salesStartDate}
                onChange={(e) => setFormData({ ...formData, salesStartDate: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.salesStartDate && (
                <p className="text-red-500 text-sm mt-1">{errors.salesStartDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.salesStartTime}
                onChange={(e) => setFormData({ ...formData, salesStartTime: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.salesStartTime && (
                <p className="text-red-500 text-sm mt-1">{errors.salesStartTime}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.salesEndDate}
                onChange={(e) => setFormData({ ...formData, salesEndDate: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.salesEndDate && (
                <p className="text-red-500 text-sm mt-1">{errors.salesEndDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.salesEndTime}
                onChange={(e) => setFormData({ ...formData, salesEndTime: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.salesEndTime && (
                <p className="text-red-500 text-sm mt-1">{errors.salesEndTime}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information
          </label>
          <textarea
            value={formData.ticketInfo}
            onChange={(e) => setFormData({ ...formData, ticketInfo: e.target.value })}
            rows={3}
            className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter any additional ticket information or restrictions"
          />
        </div>
      </div>
    </div>
  );
}