class Transaction < ApplicationRecord
    belongs_to :user

    def self.last_5(user)
        #need to query database for last 5 transactions for specified user
        where(user_id: user.id)
    end
end
