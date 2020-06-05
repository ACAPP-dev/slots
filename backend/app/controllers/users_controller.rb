class UsersController < ApplicationController
    
    def create
        
        user = User.new(user_params)
        if user.save
            session[:username] = params[:username]
            render json: user.to_json(only: [:name, :username, :balance])
        else
            render json: {error: "Unable to Create User!"}, status: not_permitted
        end
    end

    def edit

    end

    def update

    end

    def delete

    end

    private

    def user_params
        params.permit(:name, :username, :password)
    end
end
