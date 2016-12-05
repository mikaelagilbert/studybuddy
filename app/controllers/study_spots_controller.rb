class StudySpotsController < ApplicationController
  before_action :set_study_spot, only: [:show, :edit, :update, :destroy]

  # GET /study_spots
  # GET /study_spots.json
  def index
    @study_spots = StudySpot.all
  end

  # GET /study_spots/1
  # GET /study_spots/1.json
  def show
  end

  # GET /study_spots/new
  def new
    @study_spot = StudySpot.new
  end

  # GET /study_spots/1/edit
  def edit
  end

  # POST /study_spots
  # POST /study_spots.json
  def create
    @study_spot = StudySpot.new(study_spot_params)
    @study_spot.is_open == true
    respond_to do |format|
      if @study_spot.save
        format.html { redirect_to @study_spot, notice: 'Study spot was successfully created.' }
        format.json { render :show, status: :created, location: @study_spot }
      else
        format.html { render :new }
        format.json { render json: @study_spot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /study_spots/1
  # PATCH/PUT /study_spots/1.json
  def update
    status = @study_spot.update_attribute(:is_open, !@study_spot.is_open)
    respond_to do |format|
      if status
        format.html { redirect_to @study_spot.room, notice: 'Study spot was successfully updated.' }
        format.json { render :show, status: :ok, location: @study_spot }
      else
        format.html { render :edit }
        format.json { render json: @study_spot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /study_spots/1
  # DELETE /study_spots/1.json
  def destroy
    @study_spot.destroy
    respond_to do |format|
      format.html { redirect_to study_spots_url, notice: 'Study spot was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # def spot_open
  #   @study_spot = StudySpot.where("arduino_id = ?",params[:id])
  #   @study_spot.is_open = true
  #   @study_spot.save
  # end

  # def spot_taken
  #   @study_spot = StudySpot.where("arduino_id = ?",params[:id])
  #   @study_spot.is_open = false
  #   @study_spot.save
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_study_spot
      @study_spot = StudySpot.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def study_spot_params
      params.require(:study_spot).permit(:id)
    end
end
