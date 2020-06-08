Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :images, only: [:index]
  resources :users
  resources :sessions, only: [:create, :destroy]
  resources :transactions, only: [:index, :create]

end
