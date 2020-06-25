class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :balance
  has_many :transactions
end
