Rails.application.routes.draw do
  resources :memberships
  # resources :groups
  resources :comments, only: [:create, :update, :destroy]
  resources :posts
  resources :users, only: [:show, :update, :destroy]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/background', to: 'users#background'
  get '/me', to: 'users#me'
  get '/:username', to: 'posts#wall'
  get '/posts/:post_id/comments', to: 'comments#index'
  get '/groups/:group_title', to: 'groups#show'
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
