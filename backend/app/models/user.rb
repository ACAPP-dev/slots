class User < ApplicationRecord
    has_many :transactions
    has_secure_password

    def self.last_5_transactions(user)
        #need to query database for last 5 transactions for specified user
        user.transactions.last(5)
    end
end
