class TransactionSerializer < ActiveModel::Serializer
  attributes :user_id, :transaction_type, :amount, :created_at
  belongs_to :user
end
