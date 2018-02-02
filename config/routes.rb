Rails.application.routes.draw do
  get 'info/index'

  get 'about/index'
  devise_for :users
  resources :logs
  resources :profile
  root 'profile#index'
end
