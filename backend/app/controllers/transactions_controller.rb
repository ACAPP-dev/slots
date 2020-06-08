class TransactionsController < ApplicationController
    def create
        # byebug
        user = User.find_by(username: params[:username])

        if user
            user.transactions.build(trans_params)
            if params[:transaction_type] == 1
                user.balance += params[:amount]
            elsif params[:transaction_type] == 2
                user.balance -= params[:amount]
            end
            if user.save
                # byebug
                render json: user.to_json(only: [:username, :balance])
            else
                render json: {response: "Error - unable to process withdrawal"}, status: 406
            end
        else
            render json: {response: "Username not found"}, status: 404
        end
    end

    def index

    end

    private

    def trans_params
        params.permit([:transaction_type, :amount])

    end
end
