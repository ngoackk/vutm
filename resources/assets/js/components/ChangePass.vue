<template>
    <div>
<b-form>
            <b-form-group
              label="Mật khẩu mới"
              label-for="horizEmail"
              description="Đổi mật khẩu"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="horizEmail" type="password" placeholder="Nhập mật khẩu mới"  ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Xác nhận mật khẩu"
              label-for="horizPass"
              description="Ghõ lại mật khẩu"
              :label-cols="3"
              :horizontal="true">
              <b-form-input id="horizPass" type="password" placeholder="Nhập lại mật khẩu"  ></b-form-input>
            </b-form-group>
            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Lưu</b-button>
              <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Làm lại</b-button>
            </div>
          </b-form>

    </div>
</template>
