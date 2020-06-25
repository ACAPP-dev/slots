class TransactionsController < ApplicationController
    def create
        user = User.find_by(id: params[:id])

        if user
            user.transactions.build(trans_params)
            if params[:transaction_type] == 1
                user.balance += params[:amount]
            elsif params[:transaction_type] == 2
                user.balance -= params[:amount]
            end
            if user.save
                render json: user.to_json(only: [:username, :balance])
            else
                render json: {response: "Error - unable to process withdrawal"}, status: 406
            end
        else
            render json: {response: "Username not found"}, status: 404
        end
    end

    def index
        #byebug
        if params[:user_id]
            if user = User.find_by(id: params[:user_id])
                @trans = User.last_5_transactions(user)
            
                render json: @trans # Using a serializer to render information
            else
                render json: {response: "Unable to get transactions"}, status: 404
            end
        else
            render json: [response: "Must be logged in to get transactions"], status: 404
        end
    end

    private

    def trans_params
        params.permit([:transaction_type, :amount])
    end
end
