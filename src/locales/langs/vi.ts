import { LangType } from "src/locales/types";

export const vi: LangType = {
    currentLanguage: "Tiếng Việt",
    nav: {
        home: "Trang chủ",
        shop: "Cửa hàng",
        about: "Giới thiệu",
        contact: "Liên hệ",
    },
    broadcast: {
        popularCollection: {
            title: "Phổ biến",
            subTitle: "Danh sách các đầu sách phổ biến nhất",
        },
        newestCollection: {
            title: "Mới nhất",
            subTitle: "Danh sách các đầu sách mới ra mắt",
        },
        upcomingCollection: {
            title: "Sắp ra mắt",
            subTitle: "Danh sách các đầu sách sắp ra mắt",
        },
    },
    success: {
        addToCart: "Thêm vào giỏ hàng thành công",
        sendMessage: "Gửi tin nhắn thành công",
        sendEmailSubscribe: "Đăng ký thành công",
    },
    error: {
        somethingWentWrong: "Có lỗi xảy ra",
        cantApplyCoupon: "Không thể áp dụng mã giảm giá",
        coupon: {
            expired: "Mã giảm giá đã hết hạn",
            outOfUses: "Mã giảm giá đã hết lượt sử dụng",
            minPrice: "Giá trị đơn hàng tối thiểu là %{minPrice}",
        },
        sendEmailSubscribe: "Không thể đăng ký, vui lòng thử lại sau",
    },
    message: {
        backToHome: "Quay lại trang chủ",
        notFoundItem: "Không tìm thấy sản phẩm phù hợp",
        freeShipForOrderOver: "Miễn phí vận chuyển cho đơn hàng trên %{price}",
    },
    feature: {
        delivery: {
            title: "Giao hàng tận tay",
            subTitle: "Chúng tôi có dịch vụ giao hàng trên toàn quốc.",
        },
        quality: {
            title: "Chất lượng",
            subTitle: "Cam kết cung cấp sản phẩm chất lượng tốt nhất",
        },
        service: {
            title: "Tận tâm",
            subTitle: "Vui lòng khách đến, vừa lòng khách đi.",
        },
    },
    dialog: {
        orderSuccess: {
            title: "Đặt hàng thành công",
            content:
                "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.\n Chúc bạn một ngày tốt lành.",
            confirmText: "Quay lại trang chủ",
        },
    },
    common: {
        cart: "Giỏ hàng",
        send: "Gửi",
        addToCart: "Thêm vào giỏ hàng",
        buyNow: "Mua ngay",
        filter: "Lọc",
        page: "Trang",
        totalCart: "Tổng tiền",
        checkout: "Thanh toán",
        emptyCart: "Giỏ hàng trống",
        updating: "Đang cập nhật",
        detail: "Chi tiết",
        submitCoupon: "Áp dụng",
        buyMore: "Mua thêm",
    },
    pages: {
        home: {
            title: "Trang chủ",
            branding: {
                title: "Manga store online",
                subTitle:
                    "Chào mừng bạn đến với cửa hàng của chúng tôi. Rất nhiều đầu sách hay đang chờ bạn khám phá",
                button: "Xem ngay",
            },
        },
        shop: {
            title: "Cửa hàng",
            filter: {
                price: "Giá",
                availability: "Tình trạng",
                availabilityList: {
                    available: "Còn hàng",
                    preOrder: "Đặt trước",
                    outOfStock: "Hết hàng",
                },
                variant: "Dạng",
                variantList: {
                    once: "Lẻ",
                    combo: "Combo",
                    fullSet: "Trọn bộ",
                },
                rare: "Độ hiếm",
                rareList: {
                    normal: "Bình thường",
                    special: "Đặc biệt",
                    limited: "Giới hạn",
                    collection: "Sưu tầm",
                },
                range: "đến",
                format: "Kiểu bìa",
                formatList: {
                    paperback: "Bìa mềm",
                    hardcover: "Bìa cứng",
                },
            },
            result: {
                showItemsOf: "Hiển thị %{from}-%{to} trong số %{total} sản phẩm",
            },
            order: {
                newest: "Mới nhất",
                oldest: "Cũ nhất",
                priceDesc: "Giá: Cao đến thấp",
                priceAsc: "Giá: Thấp đến cao",
                discount: "Giảm giá nhiều",
                sale: "Bán chạy",
            },
        },
        book: {
            title: "Đầu sách",
            detail: "Thông tin chi tiết",
            publisher: "Nhà xuất bản",
            availability: "Tình trạng",
            format: "Kiểu bìa",
            height: "Chiều cao",
            language: "Ngôn ngữ",
            length: "Chiều dài",
            pages: "Số trang",
            publishDate: "Ngày xuất bản",
            quantity: "Số lượng",
            rare: "Độ hiếm",
            sold: "Đã bán",
            variant: "Dạng",
            size: "Kích thước",
            weight: "Cân nặng",
            width: "Chiều rộng",
            author: "Tác giả",
        },
        cart: {
            title: "Giỏ hàng",
            yourCart: "Giỏ hàng của bạn",
            billInfo: "Thông tin thanh toán",
            subTotal: "Tạm tính",
            shipping: "Phí vận chuyển",
            total: "Tổng tiền",
            processToCheckout: "Tiến hành thanh toán",
            coupon: "Mã giảm giá",
            discountValue: "Giảm",
            temporary: "Tạm tính",
            shippingFeeCanBeChanged: "Phí vận chuyển có thể thay đổi tùy vào địa chỉ của bạn",
            couponDescription:
                "Giảm %{discount} tối đa %{maxDiscount} cho đơn hàng trên %{minPrice}",
        },
        checkout: {
            title: "Thanh toán",
            checkoutInfo: "Thông tin thanh toán",
            form: {
                name: "Tên người nhận",
                email: "Email",
                phone: "Số điện thoại",
                province: "Tỉnh/Thành phố",
                district: "Quận/Huyện",
                ward: "Phường/Xã",
                address: "Địa chỉ nhận hàng",
                date: "Ngày nhận hàng",
                note: "Ghi chú cho người bán",
            },
            rules: {
                required: "Vui lòng nhập thông tin",
                phone: "Số điện thoại không hợp lệ",
            },
            asSoonAsPossible: "Giao ngay khi có thể",
            submit: "Đặt hàng",
        },
        about: {
            title: "Giới thiệu",
            whatWeAre: {
                title: "Chúng tôi là ai",
                content:
                    "Chúng tôi là những người yêu thích truyện tranh. Đây chính là động lực để chúng tôi xây dựng trang web này. Mục tiêu của chúng tôi là mang đến những bộ truyện tranh chất lượng nhất với giá cả hợp lý nhất. Hy vọng bạn sẽ có những trải nghiệm thú vị khi khám phá cửa hàng của chúng tôi. Sự ủng hộ và quan tâm của bạn đối với chúng tôi không chỉ là nguồn động viên mà còn là nền tảng quan trọng để trang web này tồn tại. Chúng tôi cam kết tiếp tục mang đến nội dung và dịch vụ tốt nhất có thể. 🙏💖",
            },
        },
        contact: {
            title: "Liên hệ",
            form: {
                name: "Tên của bạn",
                email: "Email của bạn",
                subject: "Tiêu đề",
                message: "Tin nhắn",
                submit: "Gửi tin nhắn",
            },
            formValidation: {
                name: "Vui lòng nhập tên của bạn",
                email: "Email không hợp lệ",
                subject: "Vui lòng nhập tiêu đề",
                message: "Vui lòng nhập tin nhắn",
            },
            submit: "Gửi tin nhắn",
        },
        p404: {
            title: "404",
            subTitle: "Trang bạn đang tìm kiếm không tồn tại",
            button: "Quay lại trang chủ",
        },
    },
    footer: {
        thanks: "Xin chân thành cảm ơn bạn đã ghé thăm trang web của chúng tôi. Sự ủng hộ và quan tâm của bạn là nguồn động viên quý báu đối với chúng tôi. Trang web này không thể tồn tại mà không có sự hỗ trợ từ phía bạn. Chúng tôi cam kết duy trì và cải thiện không ngừng nội dung cũng như dịch vụ để mang đến trải nghiệm tốt nhất cho bạn. 🙏💖",
        contact: "Liên hệ",
        subscribe: "Đăng ký nhận tin",
        subscribeDescription:
            "Đăng ký nhận tin của chúng tôi, bạn sẽ nhận được tin tức và khuyến mãi mới nhất.",
        copyRight: "© 2023, Bản quyền thuộc về sumsue.vn",
        terms: "Điều khoản sử dụng",
    },
};
