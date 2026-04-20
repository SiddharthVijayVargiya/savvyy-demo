
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.CgsWKOqO.js","/cdn/shopifycloud/checkout-web/assets/c1/app.4ol9kLCh.js","/cdn/shopifycloud/checkout-web/assets/c1/dist-vendor.iNG4iGFP.js","/cdn/shopifycloud/checkout-web/assets/c1/browser.Cc-eEGsv.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-useUnauthenticatedErrorModal.ANFKngEQ.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-unactionable-errors.BXFzKO7o.js","/cdn/shopifycloud/checkout-web/assets/c1/actions-shop-discount-offer.D7uCtBN5.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-alternativePaymentCurrency.DC379ABO.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-proposal.B5oQVcgw.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-shared.BsL80JEK.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-useReplaceShopPayInHistory.kCOz6_Tw.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-FullScreenBackground.bVTjdBHz.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon.C_eXYJRt.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon.BXeXx6hF.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.Ba0Vhq07.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.BDSa-bjH.js","/cdn/shopifycloud/checkout-web/assets/c1/Captcha-MarketsProDisclaimer.BTZoSWky.js","/cdn/shopifycloud/checkout-web/assets/c1/Menu-LocalPickup.Dv5L6GPg.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useEditorShopPayNavigation.BNImUbT4.js","/cdn/shopifycloud/checkout-web/assets/c1/adapter-useForceShopPayUrl.ZLPFRFFJ.js","/cdn/shopifycloud/checkout-web/assets/c1/icons-ShopPayLogo.BCk55I0_.js","/cdn/shopifycloud/checkout-web/assets/c1/BuyWithPrimeChangeLink-VaultedPayment.D3JChg-E.js","/cdn/shopifycloud/checkout-web/assets/c1/DeliveryMacros-ShippingGroupsSummaryLine.C8Qprqo8.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandisePreviewThumbnail-StackedMerchandisePreview.5i8pSbcX.js","/cdn/shopifycloud/checkout-web/assets/c1/Map-PickupPointCarrierLogo.BB0Y02yR.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks.SX1xIGhc.js","/cdn/shopifycloud/checkout-web/assets/c1/PostPurchaseShouldRender-LocalizationExtensionField.DlN1umQo.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-useShowShopPayOptin.C7QUn_vr.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-ShopPayOptInDisclaimer.CU-Dpqax.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-RememberMeDescriptionText.B78srUSI.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-MobileOrderSummary.CUh2k3aD.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-OrderEditVaultedDelivery.B0ylUxsk.js","/cdn/shopifycloud/checkout-web/assets/c1/captcha-SeparatePaymentsNotice.BHLTDh-X.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.DWAQJInw.js","/cdn/shopifycloud/checkout-web/assets/c1/redemption-useShopCashCheckoutEligibility.BCxWu2iX.js","/cdn/shopifycloud/checkout-web/assets/c1/negotiated-ShipmentBreakdown.BvY8IJ3r.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-MerchandiseModal.C54jk-Ul.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shipping-options.DWoTdb0q.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-DutyOptions.BdPbGEz2.js","/cdn/shopifycloud/checkout-web/assets/c1/DeliveryInstructionsFooter-ShippingMethodSelector.DZTokuLk.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-SubscriptionPriceBreakdown.BXMzmKd2.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.fH9d1Lew.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useUnauthenticatedErrorModal.L7QnIzza.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/FullScreenBackground.C_-DGgHU.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.Di1yeo0T.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.DmhmOh0D.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalizationExtensionField.oEoBAbtG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.Cko1fUoG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OrderEditVaultedDelivery.CSQKPDv7.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useEditorShopPayNavigation.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DutyOptions.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PickupPointCarrierLogo.cbVP6Hp_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingMethodSelector.B0hio2RO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/SubscriptionPriceBreakdown.BSemv9tH.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0537/7192/7717/files/savvyy-logo_x320.png?v=1674908054"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  