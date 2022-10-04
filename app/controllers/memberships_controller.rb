class MembershipsController < ApplicationController
  def create
    membership = Membership.create!(membership_params)
    group = Group.find(membership.group_id)
    group_serial = GroupSerializer.new(group).serializable_hash[:data][:attributes]
    user_data = group.current_user_in_group?(current_user)    
    data = {group: group_serial, user: { is_in_group: user_data, membership_id: membership.id }}
    render json: data, status: :created
  end

  def destroy
    membership = Membership.find_by(id: params[:id])
    membership.destroy
    head :no_content
  end

  private 

  def membership_params
    params.require(:membership).permit(:user_id, :group_id, :membership_id)
  end
end
