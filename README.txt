HIẾN MÁU BỆNH VIỆN BẠCH MAI — SOURCE 21.5
====================================================
ĐÃ SỬA FRONTEND VÀ BACKEND, CHƯA UPLOAD/GITHUB/DEPLOY.

CẤU TRÚC
- index_21.5.html: Frontend GitHub Pages, thay tên index.html khi xuất bản.
- Code_21.5.gs: Backend Apps Script, thay nội dung Code.gs ở dự án đích ĐÚNG.
- manifest.json, service-worker.js, 4 icon PNG: phục vụ PWA.
- 9 Google Sheets: CONFIG, DONORS, ORGANIZATIONS, REGISTRATIONS,
  QUESTIONS, DONATION_RESULTS, ORGANIZATION_RESULTS, AUDIT_LOG, SYSTEM_DATA.

CÁC BƯỚC BẮT BUỘC TRƯỚC KHI CHẠY THỬ
1. Tạo Spreadsheet MỚI, nhập SPREADSHEET_ID tại Script Properties hoặc
   gọi setSpreadsheetId(id), sau đó chạy setupApp() đúng 1 lần.
2. Chỉnh múi giờ Apps Script project thành Asia/Ho_Chi_Minh.
3. Thiết lập PERSONNEL_SPREADSHEET_ID và PERSONNEL_SHEET_NAME qua Script
   Properties (nguồn nhân sự đang dùng chung, không tự tạo mật khẩu). Mặc định
   sheet nhân sự là DATA, nhưng spreadsheet ID PHẢI được nhập thủ công.
4. Chỉ định SUPER_ADMIN_IDS (CSV mã nhân viên), ví dụ E001. KHÔNG cung cấp
   tự động một mã quản trị mặc định. Quyền nhân viên khác dùng
   STAFF_ROLE_MAP, ví dụ {"E002":"RECEPTION","E003":"ADMIN"}.
   STAFF_FACILITY_MAP quản lý quyền theo cơ sở,
   ví dụ {"E002":["CSHN"],"E003":["CSHN","CSNB"]}.
   Super Admin được truy cập cả hai cơ sở.
5. Trong Cài đặt, xác nhận lịch, ngưỡng chuyên môn và mã loại hiến cho CSHN
   và CSNB riêng. Trong loại hiến, thiết lập khoảng cách theo THÁNG,
   do chuyên môn phê duyệt; khoảng cách seed bằng 0 để KHÔNG áp dụng
   ngầm một giá trị pháp lý không được xác nhận. Không mở nhận đăng ký
   trước khi hoàn tất cấu hình.
6. Hai cơ sở mặc định TẮT nhận đăng ký công khai. Super Admin chọn bật
   đúng cơ sở đang nhận sau khi cấu hình được duyệt.
7. Trong index_21.5.html kiểm tra hằng WEB_APP_URL (/exec) phải là
   deployment ID của Apps Script backend 21.5 tương ứng. Nếu triển khai
   deployment mới, CẦN cập nhật URL trước khi xuất bản frontend.
8. Người dân đăng ký bằng URL https://<GitHub Pages>/...?mode=donor.
   URL gốc (không query) là màn hình ĐĂNG NHẬP NHÂN VIÊN.
   QR hiển thị trong Cài đặt > QR đăng ký.
9. Cấu hình TURNSTILE_SECRET + Site Key tương ứng cho đăng ký công khai,
   giới hạn người gửi tự động. TURNSTILE_SECRET để trống thì xác minh
   bot không được bật. Cân nhắc yêu cầu OTP hoặc cơ chế xác thực mạnh hơn
   khi triển khai cho người dân với quyền đổi/hủy lịch.
10. Kiểm thử thực tế trên deployment STAGING trước khi cho người thật
    đăng ký. Kiểm tra QR, tiếp nhận, điều kiện lâm sàng, quyền 2 cơ sở,
    kết quả và báo cáo. Phiên bản này chưa được xác nhận trên GAS thật.

NGUYÊN TẮC BÁO CÁO
- Kết quả cá nhân tính theo ngày hiến thực tế đã xác nhận.
- Số dự kiến và số thực tế tổ chức độc lập.
- Tổng tổ chức đã bao gồm các trường hợp có hồ sơ cá nhân liên quan;
  KHÔNG cộng trực tiếp khi chưa đối soát; cột "chưa đối soát" vẫn hiển thị.
- File báo cáo hiện xuất CSV UTF-8 BOM, mở bằng Excel. Chưa phải .xlsx native.

CẢNH BÁO BẢO MẬT CÒN TỒN TẠI
- Nguồn nhân sự dùng chung vẫn kiểm tra password từ Sheet; CHƯA nâng
  cấp sang cơ chế xác thực mật khẩu băm của tổ chức. Không thể đổi an toàn
  nếu chưa thống nhất cơ chế chung với những ứng dụng đang dùng nguồn này.
- Tra cứu lịch CCCD+SĐT theo quyết định nghiệp vụ là xác thực yếu.
- FCM/PWA cần kiểm thử trên trình duyệt thật nếu bật thông báo nền.

KIỂM THỬ ĐÃ THỰC HIỆN
- JS frontend/backend syntax: đạt.
- Google Sheets, Props, Lock giả lập: đăng ký cá nhân/tổ chức,
  trùng, tiếp nhận, kết quả thành công, không đủ điều kiện,
  cơ sở Hà Nội/Ninh Bình, tiếp nhận trực tiếp và tổng hợp tổ chức: đạt.
- Chưa có integration test với Apps Script/Google Sheets thật, chưa load test
  vài trăm người đồng thời, chưa triển khai.
