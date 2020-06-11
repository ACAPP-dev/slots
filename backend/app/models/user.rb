class User < ApplicationRecord
    has_many :transactions
    has_secure_password

    validates :name, :username, presence: true

    def self.last_5_transactions(user)
        user.transactions.last(5)
    end
end
