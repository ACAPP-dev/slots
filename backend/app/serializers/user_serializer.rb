class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :balance
end
