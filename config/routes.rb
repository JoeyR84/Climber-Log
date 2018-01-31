Rails.application.routes.draw do

  get 'info/index'

  get 'about/index'

  get 'welcome/show'

  root to: 'welcome#index'
  devise_for :users
  resources :profile
  resources :logs
end
