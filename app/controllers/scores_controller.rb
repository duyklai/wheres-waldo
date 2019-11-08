class ScoresController < ApplicationController
    def new
        @score = Score.new
        @time = params[:score]

        respond_to do |format|
            format.html
        end
    end

    def create
        photo_id = params[:score][:photo_id]
        @photo = Photo.find(photo_id)
        @score = @photo.scores.build(name: params[:score][:name],
                                      score: params[:score][:score])
        if(@score.save)
            flash[:success] = "Score saved!"
        else
            flash[:danger] = "Score not saved."
        end

        redirect_to scores_path(:photo_id => photo_id)
    end

    def index
        photo_id = params[:photo_id]
        @scores = Score.where(:photo_id => photo_id)
        @photo = Photo.find(photo_id)
    end

end
