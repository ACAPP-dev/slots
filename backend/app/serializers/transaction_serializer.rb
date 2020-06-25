class TransactionSerializer < ActiveModel::Serializer
  attributes :transaction_type, :amount, :created_at
end
