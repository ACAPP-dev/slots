class ImagesController < ApplicationController

    def index
        images = Image.all
        render json: images.to_json(:only => [:id, :name, :source])
    end
end
