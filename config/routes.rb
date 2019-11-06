Rails.application.routes.draw do
  get 'static_pages/home'
  root 'static_pages#home'

  resources :photos, only: [:show]
end
