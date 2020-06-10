class User < ApplicationRecord
    has_many :transactions
    has_secure_password

    def self.last_5_transactions(user)
        user.transactions.last(5)
    end
end
