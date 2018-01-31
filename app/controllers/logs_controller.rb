class LogsController < ApplicationController
  before_action :authenticate_user!

  def index
    logs
  end

  def show
    @user = logs.find(params[:id])
  end

  def create
    if new_log(log_params).save
      render json: {
        log: new_log.as_json
      }
    else
      render json: {
        errors: new_log.errors
      }
    end
  end

  def update
    if log.update(log_params)
      render json: {
        log: log.as_json
      }
    else
      render json: {
        errors: log.errors
      }
    end
  end

  def destroy
    log.destroy
    render json:{
      id: log.id
    }, status: :ok
  end

  private

  def log_params
    params.require(:log).permit(:name, :description, :ocurred_on)
  end

  def new_log(attrs={})
    @log ||= current_user.logs.build(attrs)
  end

  def log
    @log ||= current_user.logs.find(params[:id])
  end

  def logs
    @logs ||= current_user.logs
  end
end
