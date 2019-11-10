Rails.application.routes.draw do
  root 'static_pages#home'
  get 'static_pages/home'

  resources :photos, only: [:show]
  resources :scores, only: [:new, :create, :index]
end
