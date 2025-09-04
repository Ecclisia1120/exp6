// script.js — this file is loaded only AFTER jQuery is available (see loader in index.html)
(function ($) {
  'use strict';

  $(function () {
    // When the form submits (Enter or button), evaluate budget
    $('#budgetForm').on('submit', function (e) {
      e.preventDefault();
      // disable button briefly to prevent double-click
      $('#evaluate').prop('disabled', true).attr('aria-disabled', 'true');
      try {
        evaluateBudget();
      } finally {
        $('#evaluate').prop('disabled', false).removeAttr('aria-disabled');
      }
    });

    function showAlert(msg, focusSelector) {
      // user-friendly alert; focus the first invalid control
      alert(msg);
      if (focusSelector) $(focusSelector).focus();
    }

    function isNumber(n) {
      return typeof n === 'number' && Number.isFinite(n);
    }

    function evaluateBudget() {
      var amountStr = $('#amount').val().trim();
      if (amountStr === '') { showAlert('Please enter the total amount.', '#amount'); return; }
      var amount = Number(amountStr);
      if (!isNumber(amount) || amount < 0) { showAlert('Enter a valid positive amount.', '#amount'); return; }

      var fields = ['rent', 'accessories', 'emergency', 'saving'];
      var values = {};
      for (var i = 0; i < fields.length; i++) {
        var id = fields[i];
        var valStr = $('#' + id).val().trim();
        if (valStr === '') { showAlert('Please enter percentage for "' + id + '".', '#' + id); return; }
        var n = Number(valStr);
        if (!isNumber(n) || n < 0) { showAlert('Enter a valid non-negative percentage for "' + id + '".', '#' + id); return; }
        values[id] = n;
      }

      var totalPercent = values.rent + values.accessories + values.emergency + values.saving;

      // allow tiny floating error tolerance
      if (Math.abs(totalPercent - 100) > 0.0001) {
        showAlert('Percentages must add up to 100. Current total: ' + totalPercent.toFixed(2) + '%.', '#rent');
        return;
      }

      // compute amounts
      var rentAmt = (values.rent / 100) * amount;
      var accAmt = (values.accessories / 100) * amount;
      var emeAmt = (values.emergency / 100) * amount;
      var savAmt = (values.saving / 100) * amount;

      // update UI (each card has .amount element)
      $('#rentBox .amount').text('Rs. ' + rentAmt.toFixed(2));
      $('#accBox  .amount').text('Rs. ' + accAmt.toFixed(2));
      $('#emeBox  .amount').text('Rs. ' + emeAmt.toFixed(2));
      $('#savBox  .amount').text('Rs. ' + savAmt.toFixed(2));

      // For screen readers, announce summary by focusing first result (aria-live region will also announce)
      $('#rentBox').attr('tabindex', '-1').focus();
    }
  });
})(jQuery);
