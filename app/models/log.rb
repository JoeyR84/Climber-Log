class Log < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :description, presence: true
  validate :ocurred_on_is_valid?

  private

  def ocurred_on_is_valid?
    if read_attribute(:ocurred_on).blank?
      self.errors.add(:ocurred_on, "can't be blank.")
    end

    begin
      Date.parse(read_attribute(:ocurred_on).to_s)
    rescue ArgumentError
      self.errors.add(:ocurred_on, "is not a valid date.")
    end
  end

end
